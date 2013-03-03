
$(document).ready(function() {
	var data = [		
		{ text: "  Produto Inexistente", value: "1" },
		{ text: "Tamanho Inexistente", value: "2" },
		{ text: "Estampa aaInexistente", value: "3" },		
		{ text: "Estampa aaInexistente", value: "4" },
		{ text: "Estampa assInexistente", value: "5" },
		{ text: "Estampa asasInexistente", value: "6" },
		{ text: "Estampa sadsaInexistente", value: "7" },
		{ text: "Estampa dasdsadInexistente", value: "8" },
		{ text: "Estampa dsadsadsaInexistente", value: "9" },
		{ text: "Estampa dsadsadsadsadsaInexistente", value: "10" },
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


