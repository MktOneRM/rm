//schema
var schema = { 
	model: {
		id: "idMotivo",
		fields: {
			idMotivo: { editable: false, nullable: false },
			Motivo: { editable: false, nullable: false }
		} 
	}
};

//Url
var baseUrl = "http://localhost:50000/api";

//dataSource
var dataSource = new kendo.data.DataSource({                    
	transport: {						
		read:  {
			url: baseUrl + "/Motivos",							
			type:"GET"      
			,contentType: "application/json"
			,dataType: "json"
		}
	},
	batch: true,
	schema: schema
});

function getMotivosSaida() {
	$("#lstMotivosSaida").kendoMobileListView({
		dataSource: dataSource,
		template: $("#listMotivosSaidaTemplate").html(),
		headerTemplate: "${value}",		
		fixedHeaders: true
	});
}