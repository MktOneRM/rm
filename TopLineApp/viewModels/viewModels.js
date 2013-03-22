(function($, console, doc) {
	var lojaViewModel,
	vFilaViewModel,
	vForaFilaViewModel,
	vForaTurnoViewModel;
      
	lojaViewModel = kendo.observable({
		lojas: [],    
        
		load: function(lojas) {
			var that = this;
			that.set("lojas", lojas);
		}
	});
    
    
	vFilaViewModel = kendo.observable({
		vFila: [],
		
		load: function(vFila) {
			var that = this;
			that.set("vFila", vFila);
		} 
        
	});
    
	vForaFilaViewModel = kendo.observable({		
		vForaFila: [],
				
		load: function(vForaFila) {
			var that = this;
			that.set("vForaFila", vForaFila);
		}    
        
	});
    
	vForaTurnoViewModel = kendo.observable({		
		vForaTurno: [],
		      
		load: function(vForaTurno) {
			var that = this;
			that.set("vForaTurno", vForaTurno);
		}     
        
	});

	$.extend(window, {
		lojaViewModel: lojaViewModel,
		vFilaViewModel: vFilaViewModel,
		vForaFilaViewModel: vForaFilaViewModel,
		vForaTurnoViewModel: vForaTurnoViewModel
		
	});
})(jQuery, console, document);