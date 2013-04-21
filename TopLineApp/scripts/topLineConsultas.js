(function($, undefined) {

    
    var data = [
		{ Data: "01/01/2003", Previsto:50, Realizado: 10, Percentual: 20},
		{ Data: "02/01/2003", Previsto:100, Realizado: 10, Percentual: 10},
		{ Data: "03/01/2003", Previsto:30, Realizado: 15, Percentual: 50}
	];
    
	var scData = {
		model:{
			id: "Data",
			fields: {
				Data: { type: "string"},
				Previsto: { type: "int"},  
                Realizado: { type: "int"},
				Percentual: { type: "float"}  
			}
		}
	};
    
	var dsData = new kendo.data.DataSource({ 
		data: data,
		schema: scData,
		change: function (e) {			
			viewModelConsultas.set("dataSelecionado", this.view());
		}
	});
    
    var viewModelConsultas = kendo.observable({	
        dsData: dsData,
        dataSelecionado: []
        
    })
    
	$.extend(window, {
        viewModelConsultas: viewModelConsultas
	});
    
})(jQuery);