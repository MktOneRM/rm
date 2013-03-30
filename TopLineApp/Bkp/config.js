define([], function () {
	var domain = "revenuemachine11.provisorio.ws",
	serverUrl = "http://" + domain,
	serviceUrl = serverUrl + "/api";
    
	return {
		domain: domain,
		serverUrl: serverUrl,
		serviceUrl: serviceUrl,
				        
		vFilaUrl: serviceUrl + "/RmFilaLoja/1",
		vForaFilaUrl: serviceUrl + "/RmFilaLoja/2",
		vForaTurnoUrl: serviceUrl + "/RmFilaLoja/3",
		AtSubmitUrl: serverUrl + "/RmRepositorioAtendimento"
		
	};
});