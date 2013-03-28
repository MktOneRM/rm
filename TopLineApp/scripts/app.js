define(["jQuery", "kendo", "kendoIndexedListView",  "config", "utils", "topLine", "homeLayout"],
	   function($, kendo, x, config, utils, topLine, homeLayout) {
       
		   var _onError = function (error, url, line) {
			   utils.showError(error);
		   };

		   var init = function () {
			   window.onerror = _onError;

			   var kendoApp = new kendo.mobile.Application(document.body, {
				   transition: "fade",				   
				   loading: '<h1 class="loading-message">Carregando...</h1>'
			   });
			   utils.init(kendoApp);
			   
		   };

		   return {
			   closeErrorModal: utils.closeError,
			   config: config,
			   init: init,
			   topLine: topLine,
               homeLayout: homeLayout
           };
	   });