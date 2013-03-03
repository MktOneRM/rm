var groupedData = [
	{ name: "Rafael Fernandes",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Celso Baia",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Ralph Araujo",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" },
	{ name: "Vendedor ",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" }
					
];

function getListaFilaDaVez() {
	$("#lstVendedoresFila").kendoMobileListView({
		dataSource: kendo.data.DataSource.create({data: groupedData, group: "letter" }),
		template: $("#listVendedoresFilaTemplate").html(),
		headerTemplate: "${value}",
		fixedHeaders: true
	});
}
                		
function editProduct(e) {				
	app.navigate("#editor"); //navigates to editor view
}