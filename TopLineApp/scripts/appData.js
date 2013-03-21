var AppData = function() {
	var _endpoints,	
	_private;

	_endpoints = {
		urlLoja: {path:"http://localhost:50000/api/rmLoja", verb:"GET"},        
		urlVFila: {path:"http://localhost:50000/api/rmFilaLoja/3", verb:"GET"},
		urlVForaFila: {path:"http://localhost:50000/api/rmFilaLoja/1", verb:"GET"},
		urlVForaExp: {path:"http://localhost:50000/api/rmFilaLoja/1", verb:"GET"}
	};
	
	_private = {
		
		load: function(route, options) {
			var path = route.path,
			verb = route.verb,
			dfd = new $.Deferred();

			console.log("GETTING", path, verb, options);

			//Return cached data if available (and fresh)
			if (verb === "GET" && _private.checkCache(path) === true) {
				//Return cached data
				dfd.resolve(_private.getCache(path));
			}
			else {
				//Get fresh data
				$.ajax({
					type: verb,
					url: path,
					data: options,
					dataType: "json"
				}).success(function (data, code, xhr) {
					_private.setCache(path, {
						data: data,
						expires: new Date(new Date().getTime() + (15 * 60000)) //+15min
					});
					dfd.resolve(data, code, xhr);
				}).error(function (e, r, m) {
					console.log("ERROR", e, r, m);
					dfd.reject(m);
				});
			}

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

			//TODO: Deserialize JSON string
			return cache.data.data;
		}
	};

	return {
        
		getLojas: function() {
			var route = $.extend({}, _endpoints.urlLoja);
            
			return _private.load(route, {});
		},
        
		getVendedoresFilaA:
		function() {
			var route = $.extend({}, _endpoints.urlVFila);
            
			return _private.load(route, {});
		}
	};
}