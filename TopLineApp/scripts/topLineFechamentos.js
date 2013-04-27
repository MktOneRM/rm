(function($, undefined) {
	//var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	var baseUrl = "http://localhost:50000/api";
   
	var scFechamento = {
		model:{
			id: "FecId",
			fields: {
				FecId: { type: "int", editable: false, nullable: false, defaultValue:0},
				LojId: { type: "int", nullable: false, defaultValue: 0},
				HfuId: { type: "int", editable: true, defaultValue: 0},                
				FecDtFechamento: { type: "date", validation: { required: false}, editable: true, nullable: false},                
				FecHrFechamento: { type: "date", editable: true, nullable: false},                
				FecQtInfVenda: { type: "int", validation: { required: true}, editable: true, nullable: false, defaultValue:0},
				FecQtApuVenda: { type: "int", editable: true, defaultValue:0},
				FecVlInfVenda: { type: "float", validation: { required: true}, editable: true, nullable: false, defaultValue:0},
				FecVlApuVenda: { type: "float", editable: true, defaultValue:0},
				FecEstoqueTotal: { type: "int", editable: true, defaultValue:0},
				FecPrecoMedio: { type: "float", editable: true, defaultValue:0},
				TipoFechamento: { type: "int", editable: true, defaultValue:0}
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
					return {id: viewModel.lojaSelecionada.LojId}
				else if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}     
		},
		batch: true,
		sort: { field: "FecParcial", dir: "desc" },
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
					return {id: viewModel.lojaSelecionada.LojId}
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
        { Id:0,Desc:""},
		{ Id:1,Desc:"Parcial"},
		{ Id:2,Desc:"Turno"},
		{ Id:3,Desc:"Loja"}
	];
    
	var scTiposFech = {
		model:{
			id: "Id",
			fields: {
				Id: { type: "number"},
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
		turnos: [],
		tiposFech: [],
		editorFecViewInit: editorFecViewInit,
		adicionarFechamento: adicionarFechamento
	});

	function fechamentos() {        
		viewModelFechamento.dsFechamento.read();
	};
	
	function adicionarFechamento() {
		var novoFechamento = viewModelFechamento.dsFechamento.add();
		viewModelFechamento.set("fechamentoSelecionado", novoFechamento);
		viewModelFechamento.fechamentoSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));
		app.navigate("#editorFechamento-view");
	}
	
	function editorFecViewInit(e) {
		var view = e.view;
        
		viewModelFechamento.dsTurnosFunc.read();
        viewModelFechamento.dsTiposFech.read();
        
		validatorFechamento = $("#editorFechamento").kendoValidator().data("kendoValidator");
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsFechamento.one("change", function() {
				dsFechamento.sync();
				view.loader.hide();
				app.navigate("#infoFechamento-view");                
			});
         
			view.loader.show();
            
			if (validatorFechamento.validate()) {
				console.log(viewModelFechamento);
				view.loader.hide();
				return;
                
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
	
	$.extend(window, {       
		viewModelFechamento: viewModelFechamento,		
		showFechamentos: fechamentos,
		adicionarFechamento: adicionarFechamento,
		editorFecViewInit: editorFecViewInit
	});
})(jQuery);