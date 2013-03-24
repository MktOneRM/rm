(function($, doc) {
	var _app,
	_appData = new AppData()
    
	_app = {
		init: function() {
			vFilaViewModel.load(_appData.getVendedoresFila());
            atendimentoViewModel.load(_appData.getInitialAtendimento());
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
        
        colsShow: function(){
            colsViewModel.load(_appData.getColaboradores());            
        },
        
        tiposMovShow: function(){
            tiposMovViewModel.load(_appData.getTiposMov());
        },
        
		onAddLojaViewShow: function() {
			addLojaViewModel.resetView();            
		},
        
        onAddAtendimentoShow: function(){
            addAtendimentoViewModel.resetView();
        }
        
       
	};
    
	_app.init();
        
	$.extend(window, {
		lojaViewModel: _app.lojaViewModel,
		onLojasShow: _app.lojasShow,        
        onAddLojaViewShow: _app.onAddLojaViewShow,       
        
        colsViewModel: _app.colsViewModel,
        colsShow: _app.colsShow,
		
		vFilaViewModel: _app.vFilaViewModel,
		onVFilaShow: _app.vFilaShow,
        
		vForaFilaViewModel: _app.vForaFilaViewModel,
		onVForaFilaShow: _app.vForaFilaShow,
        
		vForaTurnoViewModel: _app.vForaTurnoViewModel,
		onVForaTurnoShow: _app.vForaTurnoShow,
        
        onTiposMovShow: _app.tiposMovShow,
        
        onAddAtendimentoShow: _app.onAddAtendimentoShow
		
	});
}(jQuery, document));