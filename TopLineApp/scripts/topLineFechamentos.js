(function($, undefined) {
	//var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	var baseUrl = "http://localhost:50000/api";
   
	var scFechamento = {
		model:{
			id: "FecId",
			fields: {
				FecId: { type: "int", editable: false, nullable: false, defaultValue:0},
				LojId: { type: "int", nullable: false},
				HfuId: { type: "int", editable: true, nullable: true},                
				FecDtFechamento: { type: "date", validation: { required: false}, editable: true, nullable: false},                
				FecHrFechamento: { type: "time", editable: true, nullable: false},                
				FecQtInfVenda: { type: "int", validation: { required: true}, editable: true, nullable: false},
				FecQtApuVenda: { type: "int", editable: true, nullable: true},
				FecVlInfVenda: { type: "int", validation: { required: true}, editable: true, nullable: false},
				FecVlApuVenda: { type: "int", editable: true, nullable: true},
				FecEstoqueTotal: { type: "int", editable: true, nullable: true}
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
    
	var viewModelFechamento = new kendo.observable({
		dsFechamento: dsFechamento,
		fechamentos: fechamentos,
		fechamentoSelecionado: [],
		editorFechamentoViewInit: editorFechamentoViewInit
	});

	function fechamentos() {        
		viewModelFechamento.dsFechamento.read();
	};
	
	function editorFechamentoViewInit() {
		validatorFechamento = $("#editorFechamento").kendoValidator().data("kendoValidator");
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsColaborador.one("change", function() {
				dsTelColaborador.sync();
				view.loader.hide();
				app.navigate("#:back");                
			});
         
			view.loader.show();
            
			console.log("Show Confirm");
			return;
            
			if (validatorFechamento.validate()) {
				dsFechamento.sync();    
			}
		});
        
		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			dsColaborador.one("change", function() {
				view.loader.hide();
				app.navigate("#:back");
			});

			view.loader.show();			
			dsFechamento.cancelChanges();
		});
	};
	
	$.extend(window, {       
		viewModelFechamento: viewModelFechamento,
		editorFechamentoViewInit: editorFechamentoViewInit,
		showFechamentos: fechamentos
	});
})(jQuery);