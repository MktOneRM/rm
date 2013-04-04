function id(element) {
	return document.getElementById(element);
}
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
	geolocationApp = new geolocationApp();
	geolocationApp.run();
    
}
 
function geolocationApp() {
}

geolocationApp.prototype = {
	_watchID:null,
    
	run:function() {
		var that = this;
		document.getElementById("lerCoordenadas").addEventListener("click", function() {
			that._handleWatch.apply(that, arguments);
		}, false);
	},
    
	_handleRefresh:function() {
		var options = {
			enableHighAccuracy: true
		},
		that = this;
		navigator.geolocation.getCurrentPosition(function() {
			that._onSuccess.apply(that, arguments);
		}, function() {
			that._onError.apply(that, arguments);
		}, options);
	},
    
	_handleWatch:function() {
		var that = this;
		// If watch is running, clear it now. Otherwise, start it.
		if (that._watchID != null) {
			that._setResults();
			navigator.geolocation.clearWatch(that._watchID);
			that._watchID = null;
		}
		else {
			// Update the watch every second.
			var options = {
				frequency: 1000,
				enableHighAccuracy: true
			};
			that._watchID = navigator.geolocation.watchPosition(function() {
				that._onSuccess.apply(that, arguments);
			}, function() {
				that._onError.apply(that, arguments);
			}, options);
		}
	},
    
	_onSuccess:function(position) {
		// Successfully retrieved the geolocation information. Display it all.
        viewModel.lojaSelecionada.set("LojLatitude", position.coords.latitude);
        viewModel.lojaSelecionada.set("LojLongitude", position.coords.longitude);	
	},
    
	_onError:function(error) {
		this._setResults('code: ' + error.code + '<br/>' +
						 'message: ' + error.message + '<br/>');
	},
    
	_setResults:function(value) {
		if (!value) {
			document.getElementById("results").innerHTML = "";
		}
		else {
			document.getElementById("results").innerHTML = value;
		}
	},
}