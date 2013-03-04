var groupedData = [
	{ name: "Rafael Fernandes",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Celso Baia - Veio coroca",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Ralph Araujo",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" },
	{ name: "Vendedor ",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" }
					
];

function getListaFilaDaVez() {
	$("#lstVendedoresFila").kendoMobileListView({
		dataSource: kendo.data.DataSource.create(
			{
			data: groupedData, 
			group: "letter", 
			sort: { field: "letter", dir: "desc" }
		}),
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