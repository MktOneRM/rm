var AppData = function() {
	var _endpoints,	
	_private;

	_endpoints = {
		urlLoja: {path:"http://localhost:50000/api/rmLoja", verb:"GET"},         
		urlLojaPost: {path:"http://localhost:50000/api/rmLoja", verb:"POST"}, 
        
		urlVFila: {path:"http://localhost:50000/api/rmFilaLoja/1", verb:"GET"},
		urlVForaFila: {path:"http://localhost:50000/api/rmFilaLoja/2", verb:"GET"},
		urlVForaTurno: {path:"http://localhost:50000/api/rmFilaLoja/3", verb:"GET"},
        
		urlTiposMov: {path:"http://localhost:50000/api/RmTipoMovimento", verb:"GET"}
        
	};
    
	_private = {
		
		load: function(route, options, cacheName) {
			var path = route.path,
			verb = route.verb,
			dfd = new $.Deferred();

			console.log("GETTING", path, verb, options, cacheName);

			//Return cached data if available (and fresh)
			//if (verb === "GET" && _private.checkCache(cacheName) === true) {
			//	//Return cached data
			//	dfd.resolve(_private.getCache(cacheName));
			//}
			//else {
                
			//Get fresh data
			$.ajax({
				type: verb,
				url: path,
				data: options,
				dataType: "json"
			}).success(function (data, code, xhr) {
				_private.setCache(cacheName, {
					data: data,
					expires: new Date(new Date().getTime() + (15 * 60000)) //+15min
				});
                
				dfd.resolve(data, code, xhr);
			}).error(function (e, r, m) {
				console.log("ERROR", e, r, m);
				dfd.reject(m);
				//Return cached data if available (and fresh)
				//if (verb === "GET" && _private.checkCache(cacheName) === true) {
				//Return cached data
				//dfd.resolve(_private.getCache(cacheName));
				//}
			});
                
			//}

			return dfd.promise();
		},
        
		checkCache: function(path) {
			var data,
			path = JSON.stringify(path);

			try {
				data = JSON.parse(localStorage.getItem(path));
                
				if (data === null || data.expires <= new Date().getTime()) {
					console.log("CACHE EMPTY", path);
					return false;
				}
			}
			catch (err) {
				console.log("CACHE CHECK ERROR", err);
				return false;
			}

			console.log("CACHE CHECK", true, path);
			return true;
		},
        
		setCache: function(path, data, expires) {
			var cache = {
				data: data,
				expires: expires
			},
			path = JSON.stringify(path);

			//TODO: Serialize JSON object to string
			localStorage.setItem(path, JSON.stringify(cache));

			console.log("CACHE SET", cache, new Date(expires), path);
		},
        
		getCache: function(path) {
			var path = JSON.stringify(path),
			cache = JSON.parse(localStorage.getItem(path));
         
			console.log("LOADING FROM CACHE", cache, path);
            
			var result = null;
            
			if (cache == null)
				result = {"data":{"data":[],"expires":"2013-03-22T21:48:17.015Z"}};
			else 
				result = cache.data.data;
            
			//TODO: Deserialize JSON string
			return result;
		}
	};

	return {
        
        
		getVendedoresFila:
		function() {
			var route = $.extend({}, _endpoints.urlVFila);            
			_private.load(route, {}, "vFila");                
			var result = _private.getCache("vFila");            
			return result;
		},
        
		getVendedoresForaFila:
		function() {
			var route = $.extend({}, _endpoints.urlVForaFila);            
			_private.load(route, {}, "vForaFila");            
			var result = _private.getCache("vForaFila");            
			return result;
		},
        
		getVendedoresForaTurno: 
		function() {
			var route = $.extend({}, _endpoints.urlVForaTurno);                 
			_private.load(route, {}, "vForaTurno");            
			var result = _private.getCache("vForaTurno");            
			return result;
		},
        
		getLojas: 
		function() {
			var route = $.extend({}, _endpoints.urlLoja);            
			_private.load(route, {}, "Lojas");
			var result = _private.getCache("Lojas");            
			return result;
		},
        
		getTiposMov: function() {            
            var route = $.extend({}, _endpoints.urlTiposMov);            
			_private.load(route, {}, "TiposMov");
			var result = _private.getCache("TiposMov");            
			return result;
		},
        
		saveLoja:
		function() {
			var route = $.extend({}, _endpoints.urlLojaPost);            
			_private.load(route, {}, "Lojas");
			var result = _private.getCache("Lojas");            
			return result;  
		}
        
	
	};
}