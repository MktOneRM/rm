(function($, doc) {
	var _app,
	_appData = new AppData()
    
	_app = {
		init: function() {
			vFilaViewModel.load(_appData.getVendedoresFila());
		},        
        
		vFilaShow: function() {
			vFilaViewModel.load(_appData.getVendedoresFila());
		},
        
		vForaFilaShow: function() {
			vForaFilaViewModel.load(_appData.getVendedoresForaFila());
		},
        
		vForaTurnoShow: function() {			
			vForaTurnoViewModel.load(_appData.getVendedoresForaTurno());
		},
        
		lojasShow: function() {
			lojaViewModel.load(_appData.getLojas());
		},
        
		onAddLojaViewShow: function() {
			addLojaViewModel.resetView();            
		}
        
       
	};
    
	_app.init();
        
	$.extend(window, {
		lojaViewModel: _app.lojaViewModel,
		onLojasShow: _app.lojasShow,        
        onAddLojaViewShow: _app.onAddLojaViewShow,        
		
		vFilaViewModel: _app.vFilaViewModel,
		onVFilaShow: _app.vFilaShow,
        
		vForaFilaViewModel: _app.vForaFilaViewModel,
		onVForaFilaShow: _app.vForaFilaShow,
        
		vForaTurnoViewModel: _app.vForaTurnoViewModel,
		onVForaTurnoShow: _app.vForaTurnoShow,
		
	});
}(jQuery, document));