
$(document).ready(function() {
	var data = [		
		{ text: "Produto Inexistente", value: "1" },
		{ text: "Tamanho Inexistente", value: "2" },
		{ text: "Estampa Inexistente", value: "3" },		
		{ text: "Crédito não aprovado", value: "4" }
	];

	// create DropDownList from input HTML element
	$("#motivoNaoVenda").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: data,
		index: 0
	});
	
	var motivo = $("#motivoNaoVenda").data("kendoDropDownList");
	motivo.select(0);
	
});