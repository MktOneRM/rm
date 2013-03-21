(function($, console, doc) {
	var lojaViewModel,
	vFilaViewModel;
      
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
    
	$.extend(window, {
		lojaViewModel: lojaViewModel,
		vFilaViewModel: vFilaViewModel
		
	});
})(jQuery, console, document);