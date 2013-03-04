var groupedData = [
	{ name: "Rafael Fernandes",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Celso Baia - Veio coroca",  url: "images/Contacts.jpeg", letter: "No salão de vendas" },
	{ name: "Ralph Araujo",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" },
	{ name: "Vendedor ",  url: "images/Contacts.jpeg", letter: "Fora do salão de vendas" }
					
];

function getMotivosSaida() {
	$("#lstMotivosSaida").kendoMobileListView({
		dataSource: kendo.data.DataSource.create({data: groupedData}),		
		headerTemplate: "${value}",
		fixedHeaders: true
        
	});
}