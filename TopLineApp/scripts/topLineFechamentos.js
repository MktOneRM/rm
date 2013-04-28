(function($, undefined) {
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	//var baseUrl = "http://localhost:50000/api";

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
						id: viewModel.lojaSelecionada.LojId
					}                
				else if (operation !== "read" && data.models) {
					return kendo.stringify(data.models[0]);
				}
			}     
		},
		batch: true,		
		sort: { 
			field: "TipoFechamento", dir: "asc"            
		},
		schema: scFechamento,
		change: function (e) {						
			viewModelFechamento.set("fechamentoSelecionado", this.view());
		}, 
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
						id: viewModel.lojaSelecionada.LojId,
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
			viewModelFechamento.set("tiposFech", this.view());
		}
	});
    
	var viewModelFechamento = new kendo.observable({
		dsFechamento: dsFechamento,
		dsTurnosFunc: dsTurnosFunc,
		dsTiposFech: dsTiposFech,
		fechamentos: fechamentos,
		fechamentoSelecionado: [],
		lojaSelecionada: [],
		turnos: [],
		tiposFech: [],
		editorFecViewInit: editorFecViewInit,
		adicionarFechamento: adicionarFechamento
	});

	function fechamentos() {        
		viewModelFechamento.set("lojaSelecionada", viewModel.get("lojaSelecionada"));        
		      
		setTimeout(function() {
			// Initialize the chart with a delay to make sure
			// the initial animation is visible
			createChart();

			$("#infoFechamento-view").bind("kendo:skinChange", function(e) {
				createChart();
			});
		}, 400);
	};
	
	function adicionarFechamento() {
		var novoFechamento = viewModelFechamento.dsFechamento.add();
		viewModelFechamento.set("fechamentoSelecionado", novoFechamento);
		viewModelFechamento.fechamentoSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));   
        
        
			console.log(viewModelFechamento.fechamentoSelecionado, tiposFech[0]);
			//viewModelFechamento.fechamentoSelecionado.set("TipoFechamento", tipoFechamentoId); 
        
   
            console.log(viewModelFechamento.fechamentoSelecionado, turnos[0]);
			//viewModelFechamento.fechamentoSelecionado.set("HfuId", turnoId); 
        
		app.navigate("#editorFechamento-view");
	}
	
	function editorFecViewInit(e) {
		var view = e.view;
        
		viewModelFechamento.dsTurnosFunc.read();
		viewModelFechamento.dsTiposFech.read();
        
		validatorFechamento = $("#editorFechamento").kendoValidator().data("kendoValidator");
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsFechamento.one("change", function() {
				view.loader.hide();
				app.navigate("#infoFechamento-view");                
			});
         
			view.loader.show();
            
			if (validatorFechamento.validate()) {
				dsFechamento.sync();    
			}
			else {
				view.loader.hide();
			}
		});
        
		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			dsFechamento.one("change", function() {
				view.loader.hide();
				app.navigate("#infoFechamento-view");
			});

			view.loader.show();			
			dsFechamento.cancelChanges();
		});
	};
	
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
					skip: 5,
					step: 5
				}, {
					name: "Valor",
					color: "#73c100",
					skip: 5,
					step: 5
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
				format: "N0"
			}
		});
	}
    
	$.extend(window, {       
		viewModelFechamento: viewModelFechamento,		
		showFechamentos: fechamentos,
		adicionarFechamento: adicionarFechamento,
		editorFecViewInit: editorFecViewInit
	});
})(jQuery);