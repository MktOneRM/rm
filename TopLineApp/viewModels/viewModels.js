(function($, console, doc) {
	var lojaViewModel,
	vFilaViewModel,
	vForaFilaViewModel,
	vForaTurnoViewModel,
	tiposMovViewModel,
	AddLojaViewModel;
      
	lojaViewModel = kendo.observable({
		lojas: [],    
        
		load: function(lojas) {
			var that = this;
			that.set("lojas", lojas);
		}
	});
    
	AddLojaViewModel = kendo.data.ObservableObject.extend({
		loja: null,
        
		init: function() {
			kendo.data.ObservableObject.fn.init.apply(this, [this]);            
			var that = this;
			that.set("loja", null);
		},
        
		resetView: function() {
			var that = this;
			that._reset();
		},
        
		addNewLoja: function() {            
			var that = this;     
            
			lojaViewModel.set("loja", that);
   
			console.log(lojaViewModel);
			console.log(JSON.stringify(lojaViewModel.loja), "JSON");
            
			lojaViewModel.lojas.bind("change", that);
            
			app.navigate("views/ConsultaLojaView.html");
		},
        
		_reset: function() {
			var $cnpjField = $('#cnpjField');            
			$cnpjField.focus();
			$cnpjField.val("");
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
    
	tiposMovViewModel = kendo.observable({
		tiposMov: [],
        
		load: function(tiposMov) {
			var that = this;
			that.set("tiposMov", tiposMov);
		}     
        
	});
    
	$.extend(window, {
		lojaViewModel: lojaViewModel,
		vFilaViewModel: vFilaViewModel,
		vForaFilaViewModel: vForaFilaViewModel,
		vForaTurnoViewModel: vForaTurnoViewModel,
		tiposMovViewModel: tiposMovViewModel,
		addLojaViewModel: new AddLojaViewModel(),
		
	});
})(jQuery, console, document);