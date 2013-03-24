(function($, console, doc) {
	var lojaViewModel,
	addLojaViewModel,
	vFilaViewModel,
	vForaFilaViewModel,
	vForaTurnoViewModel,
	tiposMovViewModel,	
	addAtendimentoViewModel,
	atendimentoViewModel,
    _appData = new AppData();
      
	lojaViewModel = kendo.observable({
		lojas: [],    
        
		load: function(lojas) {
			var that = this;
			that.set("lojas", lojas);
		}
	});
    
	colsViewModel = kendo.observable({
		colaboradores: [],
        
		load: function(colaboradores) {
			var that = this;
			that.set("colaboradores", colaboradores);
		}
        
	});
    
	addLojaViewModel = kendo.data.ObservableObject.extend({
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
    
	atendimentoViewModel = kendo.observable({
		atendimento: [],
        
		load: function(atendimento) {
			var that = this;
			that.set("atendimento", atendimento);
            
            console.log(atendimento);
            
		} 
        
	});
    
	addAtendimentoViewModel = kendo.data.ObservableObject.extend({
		atendimento: [],
        
		init: function() {
			kendo.data.ObservableObject.fn.init.apply(this, [this]);            
			var that = this;
			that.set("atendimento", null);
		},
        
		resetView: function() {
			var that = this;
			that._reset();
		},
        
		addNewAtendimento: function() {            
			var that = this;                 
            
			console.log(this, "this");
            console.log(atendimentoViewModel.atendimento, "Aten");
            
            atendimentoViewModel.set("atendimento", that);
			atendimentoViewModel.atendimento.bind("change", that);
            
			_appData.setAtendimento(JSON.stringify(atendimentoViewModel.atendimento));
					       
			//app.navigate("views/VFilaView.html");
            
		},
        
		_reset: function() {
			var $RepQtde = $('#RepQtde');            
			$RepQtde.focus();
			$RepQtde.val("");
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
        
		atendimentoViewModel: atendimentoViewModel,
		
        addAtendimentoViewModel: new addAtendimentoViewModel(),        
		addLojaViewModel: new addLojaViewModel(),
		
	});
})(jQuery, console, document);