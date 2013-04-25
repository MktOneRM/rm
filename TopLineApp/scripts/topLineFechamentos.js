(function($, undefined) {
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	//var baseUrl = "http://localhost:50000/api";
	
	var scFechamento = { 
		model: {
			id: "TipoConsulta",
			fields: {
				TipoConsulta: { editable: false, nullable: false },                
				IdTipo: { editable: false, nullable: false },
				DescricaoTipo: { editable: false, nullable: false },
			} 
		}
	};
    
	var dsFechamento = kendo.data.DataSource({
        
	});
    
	var viewModelFechamento = new kendo.observable({
		dsFechamento: dsFechamento,
		editorFechamentoViewInit: editorFechamentoViewInit
	});
 
	function editorFechamentoViewInit() {
		validatorFechamento = $("#editorFechamento").kendoValidator().data("kendoValidator");
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsColaborador.one("change", function() {
				dsTelColaborador.sync();
				view.loader.hide();
				app.navigate("#:back");                
			});
         
			view.loader.show();
            
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
	}
    
	$.extend(window, {
       
		viewModelFechamento: viewModelFechamento,
		editorFechamentoViewInit: editorFechamentoViewInit
	});
})(jQuery);