(function($, doc) {
	var _app,
	_appData = new AppData()
    
	_app = {
		init: function() {
            
			//lojaViewModel.load(_appData.getLojas());
            
			vFilaViewModel.load(_appData.getVendedoresFilaA());
            
			/*
			if (window.localStorage.getItem("Loja") === null) {
			localStorage.setItem("Loja", _appData.getLojas());
			}            
			cardsViewModel.loadFromLocalStorage();
			*/
		},
       
	};
    
	_app.init();
        
	$.extend(window, {
		lojaViewModel: _app.lojaViewModel,
		vFilaViewModel: _app.vFilaViewModel
		
	});
}(jQuery, document));