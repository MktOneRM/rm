function createChart() {
	$("#chart").kendoChart({
		theme: $(document).data("kendoSkin") || "default",
		title: {
			text: "Posição de Vendas"
		},
		legend: {
			position: "bottom",
			labels: {
				template: "#= text # (#= value #%)"
			}
		},
		seriesDefaults: {
			labels: {
				visible: true,
				format: "{0}%"
			}
		},
		series: [
			{
				type: "pie",
				data: [
					{
						category: "Hydro",
						value: 22
					}, {
						category: "Solar",
						value: 2
					}, {
						category: "Nuclear",
						value: 49
					}, {
						category: "Wind",
						value: 27
					}
				]
			}
		],
		tooltip: {
			visible: true,
			format: "{0}%"
		}
	});
}
					
$(document).ready(function() {
	setTimeout(function() {
		// Initialize the chart with a delay to make sure
		// the initial animation is visible
		createChart();
					
		$("#example").bind("kendo:skinChange", function(e) {
			createChart();
		});
	}, 400);
})