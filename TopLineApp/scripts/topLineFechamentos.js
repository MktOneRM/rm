(function($, undefined) {

     var baseUrl = "http://revenue.azurewebsites.net/api";
    //var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
    //var baseUrl = "http://localhost:63504/api";


	kendo.data.binders.date = kendo.data.Binder.extend({
		init: function (element, bindings, options) {
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
 
			this.dateformat = $(element).data("dateformat");
		},
		refresh: function () {
			var data = this.bindings["date"].get();
			if (data) {
				var dateObj = new Date(data);
				$(this.element).text(kendo.toString(dateObj, this.dateformat, "pt-BR"));
			}
		}
	});
    
	kendo.data.binders.valorFechamento = kendo.data.Binder.extend({		
		refresh: function() {
			var that = this,
			value = that.bindings["valorFechamento"].get(), //get the value from the View-Model
			formatedValue = kendo.toString(value, "c", "pt-BR"); //format
			$(that.element).text(formatedValue); //update the HTML input element
		}
	});
    
	var scFechamento = {
		model:{
			id: "FecId",
			fields: {
				FecId: { type: "int", editable: false, nullable: false, defaultValue:0},
				LojId: { type: "int", nullable: false, defaultValue: 0},
				HfuId: { type: "int", editable: true, defaultValue: 0},                
				FecDtFechamento: { type: "date", validation: { required: false}, editable: true, nullable: false, defaultValue: null},                
				FecHrFechamento: { editable: true, nullable: false, defaultValue: null},                
				FecQtInfVenda: { type: "int", validation: { required: true}, editable: true, nullable: false, defaultValue:0},
				FecQtApuVenda: { type: "int", editable: true, defaultValue:0},
				FecVlInfVenda: { type: "float", validation: { required: true}, editable: true, nullable: false, defaultValue:0},
				FecVlApuVenda: { type: "float", editable: true, defaultValue:0},
				FecEstoqueTotal: { type: "int", editable: true, defaultValue:0},
				FecPrecoMedio: { type: "float", editable: true, defaultValue:0},
				FecParcial: { type: "boolean", editable: true, defaultValue:true},
				TipoFechamento: { type: "string", editable: true, defaultValue:""}
			}
		},
		data: function(response) {
			viewModelFechamento.set("fechamentoApurado", response);             
			return response.results; 
		}
	};
 
	var scTurnosFunc = { 
		model: {
			id: "TufId",
			fields: {
				TufId: { editable: false, nullable: false },
				TufDescricao: { editable: false, nullable: false }
			} 
		}
	};
    
	var dsFechamento = new kendo.data.DataSource({
		transport: {
			read: {
				url: baseUrl + "/RmFechamento",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			},
			create: {
				url: baseUrl + "/RmFechamento",							
				type:"POST",
				contentType: "application/json",
				dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation == "read")
					return {
						id: viewModel.idLoja
					}                
				else if (operation !== "read" && data.models) {
					return kendo.stringify(data.models[0]);
				}
			}     
		},
		batch: true,
		cache: false,
		sort: { 
			field: "TipoFechamento", dir: "asc"            
		},
		schema: scFechamento        
	});
    
	var dsTurnosFunc = new kendo.data.DataSource({                    
		transport: {
			read: {
				url: baseUrl + "/RmTurnoFunc",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation == "read")
					return {
						id: viewModel.idLoja,
						isFechamento: true
					}
				else if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}     
		},
		batch: true,
		sort: { field: "TufId", dir: "asc" },
		schema: scTurnosFunc,        
		change: function(e) {			
			var turnoId = this.view()[0].get("TufId");
			viewModelFechamento.fechamentoSelecionado.set("HfuId", turnoId);            
			viewModelFechamento.set("turnos", this.view());
		}
	})

	var dataTiposFech = [		
		{ Id:"Parcial",Desc:"Parcial"},
		{ Id:"Turno",Desc:"Turno"},
		{ Id:"Loja",Desc:"Loja"}
	];
    
	var scTiposFech = {
		model:{
			id: "Id",
			fields: {
				Id: { type: "string"},
				Desc: { type: "string"}  
			}
		}
	};
    
	var dsTiposFech = new kendo.data.DataSource({ 
		data: dataTiposFech,
		schema: scTiposFech,
		change: function (e) {	            			
			var tpFechId = this.view()[0].get("Id");
			viewModelFechamento.fechamentoSelecionado.set("TipoFechamento", tpFechId);            
			viewModelFechamento.set("tiposFech", this.view());
		}
	});
    
	var viewModelFechamento = new kendo.observable({
		dsFechamento: dsFechamento,
		dsTurnosFunc: dsTurnosFunc,
		dsTiposFech: dsTiposFech,
		fechamentos: fechamentos,
		fechamentoSelecionado: [],
		fechamentoApurado: [],
		lojaSelecionada: [],
		turnos: [],
		tiposFech: [],
		editorFecViewInit: editorFecViewInit,
		editorFecViewShow: editorFecViewShow,
		adicionarFechamento: adicionarFechamento,
		dataAtual: "",
		confirma: 0
	});

	function fechamentos() {        
		var qtdApurada = 0;
		var qtdInformada = 0;
		var divQtde = 0;
		var valorApurado = 0;
		var valorInformado = 0;
		var divValor = 0;
        
		qtdApurada = viewModelFechamento.fechamentoApurado.fecQtApuVenda;
		qtdInformada = viewModelFechamento.fechamentoApurado.fecQtInfVenda;
		divQtde = (qtdApurada - qtdInformada);
        
		valorApurado = viewModelFechamento.fechamentoApurado.fecVlApuVenda;
		valorInformado = viewModelFechamento.fechamentoApurado.fecVlInfVenda;
		divValor = (valorApurado - valorInformado);
        
		viewModelFechamento.fechamentoApurado.set("divergenciaQtde", divQtde); 
		viewModelFechamento.fechamentoApurado.set("divergenciaValor", divValor);
        
		if (divQtde < 0)
			$(divergenciaQtde).css("color", "red");
		else if (divQtde > 0)
			$(divergenciaQtde).css("color", "blue");
		else if (divQtde == 0)
			$(divergenciaQtde).css("color", "#333333");
        
		if (divValor < 0)
			$(divergenciaValor).css("color", "red");
		else if (divValor > 0)
			$(divergenciaValor).css("color", "blue");
		else if (divValor == 0)
			$(divergenciaValor).css("color", "#333333");
	};

	function adicionarFechamento() {
		viewModelFechamento.set("lojaSelecionada", viewModel.get("lojaSelecionada"));
		var novoFechamento = viewModelFechamento.dsFechamento.add();
		viewModelFechamento.set("fechamentoSelecionado", novoFechamento);
		viewModelFechamento.fechamentoSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));		
	}

	function editorFecViewInit(e) {
		var view = e.view;

		validatorFechamento = $("#editorFechamento").kendoValidator().data("kendoValidator");
  
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			viewModelFechamento.dsFechamento.one("change", function() {				
				view.loader.hide();
				app.navigate("#infoFechamento-view");                
			});
         
			view.loader.show();

			if (validatorFechamento.validate()) {
				viewModelFechamento.dsFechamento.sync(); 
			}
			else {
				view.loader.hide();
				return;
			}
		}
		);

		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			viewModelFechamento.dsFechamento.one("change", function() {
				view.loader.hide();
				app.navigate("#dentroFila-view");
			});
			view.loader.show();			
			viewModelFechamento.dsFechamento.cancelChanges();
		});
	};

	function editorFecViewShow() {	
		adicionarFechamento();
		viewModelFechamento.dsTurnosFunc.read();
		viewModelFechamento.dsTiposFech.read();
		viewModelFechamento.set("dataAtual", new Date());
	}
    
	//Gráfico Fechamentos
	function createChart() {
		$("#chart").kendoChart({
			dataSource: dsFechamento,
			title: {
				text: "Informado X Apurado"
			},
			legend: {
				position: "bottom"
			},			
			series: [
				{
					type: "line",                            
					field: "FecVlInfVenda",
					name: "Valor Informado",
					color: "#ff1c1c",
					axis: "Valor"
				}, {
					type: "line",
					field: "FecVlApuVenda",
					name: "Valor Apurado",
					color: "#ffae00",
					axis: "Valor"
				}, {
					type: "area",
					field: "FecQtInfVenda",
					name: "Qtde. Informada",
					color: "#73c100",
					axis: "Qtde"
				}, {
					type: "area",
					field: "FecQtApuVenda",
					name: "Qtde. Apurada",
					color: "#007eff",
					axis: "Qtde"
				}
			],
			valueAxes: [
				{
					name: "Qtde",
					color: "#007eff",
					labels: {
						format: "NO",
						skip: 2,
						step: 2
					}
				}, {
					name: "Valor",
					color: "#73c100", 
					labels: {
						format: "R${0}",
						skip: 5,
						step: 2
					}
				}
			],       
			categoryAxis: {				
				field: "FecHrFechamento",
				labels: {
					rotation: -90
				},
				justified: true,
				axisCrossingValues: [0, 10]
			},		
			tooltip: {
				visible: true,
				format: "N0",
				template: "#= series.name #: #= value #"
			}
		});        
	}
    
	$.extend(window, {       
		viewModelFechamento: viewModelFechamento,		
		showFechamentos: fechamentos,
		adicionarFechamento: adicionarFechamento,
		editorFecViewInit: editorFecViewInit,
		editorFecViewShow: editorFecViewShow
	});
})(jQuery);