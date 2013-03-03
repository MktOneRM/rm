
$(document).ready(function() {
	var data = [		
		{ text: "Almoço", value: "1" },
		{ text: "Saída para cliente", value: "2" },
		{ text: "Trabalho externo", value: "3" }
	];

	// create DropDownList from input HTML element
	$("#motivoSaidaFila").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: data,
		index: 0
	});
	
	var motivo = $("#motivoSaidaFila").data("kendoDropDownList");
	motivo.select(0);
});