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
		,
		loadFromLocalStorage: function() {
			var that = this;			
			var vFila = [];

			if (window.localStorage.getItem("vFila") !== null) {
				vFila = JSON.parse(window.localStorage.getItem("vFila"));
			}
			
			that.set("vFila", vFila);
			that.vFila.bind("change", that.writeIntoLocalStorage);
            
			console.log(that, "rafael", vFila);
		},
		writeIntoLocalStorage: function(e) {
			var dataToWrite = JSON.stringify(vFilaViewModel.vFila);
			window.localStorage.setItem("vFila", dataToWrite);
		},
        
	});
    
	$.extend(window, {
		lojaViewModel: lojaViewModel,
		vFilaViewModel: vFilaViewModel
		
	});
})(jQuery, console, document);