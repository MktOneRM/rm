
//schema
var schema = { 
	model: {
		id: "IdVendedor",
		fields: {
			IdVendedor: { editable: false, nullable: false },
			VendedorNome: { editable: false, nullable: false },
			VendedorApelido: { editable: false, nullable: false },
			Fila: { editable: false, nullable: false },
			PosicaoFila: { editable: false, nullable: false },            
			Foto: { editable: false, nullable: false }            
		} 
	}
};

//Url
var baseUrl = "http://localhost:50000/api";

//dataSource
var dataSource = new kendo.data.DataSource({                    
	transport: {						
		read:  {
			url: baseUrl + "/Vendedor",							
			type:"GET"      
			,contentType: "application/json"
			,dataType: "json"
		}
	},
	batch: true,
	schema: schema,
	group: "Fila", 
	sort: { field: "PosicaoFila", dir: "asc" }	
});

function getListaFilaDaVez() {
	$("#lstVendedoresFila").kendoMobileListView({
		dataSource: dataSource,
		template: $("#listVendedoresFilaTemplate").html(),
		headerTemplate: "${value}",		
		fixedHeaders: true
	});
}

function editProduct(e) {				
	app.navigate("#resultadoAtendimento"); //navigates to editor view
}

function getPerformace(e) {				
	app.navigate("#grafResultadoAtendimento"); //navigates to editor view
}
function getMotivos(e) {				
	app.navigate("#motivosSaida"); //navigates to editor view
}