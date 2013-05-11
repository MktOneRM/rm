(function($, undefined) {
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	//var baseUrl = "http://localhost:50000/api";
    
	kendo.data.binders.cabecalho = kendo.data.Binder.extend({
		init: function (element, bindings, options) {
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
 
			this.dateformat = $(element).data("dateformat");
		},
		refresh: function () {
			var data = this.bindings["cabecalho"].get();
			if (data) {
				var dateObj = new Date(data);
				$(this.element).text(kendo.toString(dateObj, this.dateformat, "pt-BR") + " Vendas - Até " + kendo.toString(new Date(), "HH:mm") + " Hs");
			}
		}
	});
   
	kendo.data.binders.hora = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["hora"].get();
			if (value) {
				$(this.element).text(kendo.toString(value.substring(0, 5)));
			}
		}
        
	});
	
	kendo.data.binders.valorConsulta = kendo.data.Binder.extend({
		refresh: function() {
			var that = this,
			value = that.bindings["valorConsulta"].get(), //get the value from the View-Model
			formatedValue = kendo.toString(value, "n2", "pt-BR"); //format
			$(that.element).text(formatedValue); //update the HTML input element
		}
	});
	
	kendo.data.binders.qtdeConsulta = kendo.data.Binder.extend({
		refresh: function() {
			var that = this,
			valor = that.bindings["qtdeConsulta"].get(), //get the value from the View-Model
			formatedValue = kendo.toString(valor, "n0", "pt-BR"); //format
			$(that.element).text(formatedValue); //update the HTML input element
		}
	});

	//Schema Atendimento
	var scDesRealizadoVenda = { 
		model: {
			id: "RedeLojaId",
			fields:{
				RedeLojaId: { editable: false, nullable: false },
				LojaId: { editable: false, nullable: false },
				LojaColId: { editable: false, nullable: false },
				HfuId: { editable: false, nullable: false },
				MetaData: { editable: false, nullable: false },
				MetaHora: { editable: false, nullable: false },
				MetaRealizadoVlVenda: { editable: false, nullable: false },
				MetaRealizadoQtPecas: { editable: false, nullable: false },
				DataInicialMeta: { editable: false, nullable: false },
				DataFinalMeta: { editable: false, nullable: false },
				MetaRealizadoAcumulado: { editable: false, nullable: false }
			} 
		}
	};
    
	//dataSource Atendimento
	var dsDesRealizadoCol = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmDesempenho",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation == "read") {
					return {
						lojaId: viewModelConsultas.pLojId,
						hfuId: viewModelConsultas.pTufId, 
						lojaColId: viewModelConsultas.pLojColId,
						noDia: viewModelConsultas.consultaDia, 
						ateData: viewModelConsultas.consultaAteData
					}
				}
				else if (operation !== "read" && data.models) {							
					return kendo.stringify(data.models[0]);
				}
			}
		},
		batch: true,
		schema: scDesRealizadoVenda,        
		sort: {
			field: "MetaHora",
			dir: "asc"
		},
		change: function(e) {
			viewModelConsultas.set("resultado", this.view());
            
            console.log(viewModelConsultas, "Change");
            
		}
	});
    
	var viewModelConsultas = kendo.observable({	
		dsDesRealizadoCol: dsDesRealizadoCol,
  
		lojaSelecionada: [],
		colaboradorSelecionado: [],
		turnoSelecionado: [],        
		consultaDia: false,
		consultaAteData: true,
		dataAtual: "",
        
		pLojId: "null",
		pTufId: "null",
		pLojColId: "null",
                
		resultado: []
        
	})
    
	function desRealizadoColShow() {
		viewModelConsultas.set("dataAtual", new Date());
		viewModelConsultas.set("lojaSelecionada", viewModel.get("lojaSelecionada"));		
		viewModelConsultas.set("colaboradorSelecionado", viewModel.get("colaboradorSelecionado"));
        
		viewModelConsultas.set("pLojId", viewModelConsultas.lojaSelecionada.LojId);
		viewModelConsultas.set("pLojColId", viewModelConsultas.colaboradorSelecionado.LCoId); 
		viewModelConsultas.set("pTufId", "null"); 
        
		//Efetua a leitura do Datasource.
		dsDesRealizadoCol.read();
	}
    
	function desRealizadoLojaShow() {
		viewModelConsultas.set("dataAtual", new Date());
		viewModelConsultas.set("lojaSelecionada", viewModel.get("lojaSelecionada"));
		viewModelConsultas.set("pLojId", viewModelConsultas.lojaSelecionada.LojId); 
		viewModelConsultas.set("pTufId", "null"); 
		viewModelConsultas.set("pLojColId", "null"); 
        
		//Efetua a leitura do Datasource.
		dsDesRealizadoCol.read();
	}
        
	function desRealizadoTurnoShow() {
		viewModelConsultas.set("dataAtual", new Date());
		viewModelConsultas.set("lojaSelecionada", viewModel.get("lojaSelecionada"));
		viewModelConsultas.set("turnoSelecionado", viewModel.get("turnoSelecionado"));		      
		viewModelConsultas.set("pLojId", viewModelConsultas.lojaSelecionada.LojId); 
		viewModelConsultas.set("pTufId", viewModelConsultas.turnoSelecionado.TufId); 	
		viewModelConsultas.set("pLojColId", "null");
        
        console.log(viewModelConsultas);
        
		//Efetua a leitura do Datasource.
		dsDesRealizadoCol.read();
	}
    
	function GrafDesRealizadoColShow() {    
		setTimeout(function() {
			// Initialize the chart with a delay to make sure
			// the initial animation is visible
			grafDesRealizadoVenda("#chtGrafDesRealizadoVendaCol");
			$("#grafDesRealizadoCol-view").bind("kendo:skinChange", function(e) {
				grafDesRealizadoVenda("#chtGrafDesRealizadoVendaCol");
			});
		}, 100);
	};
    
	function GrafDesRealizadoLojaShow() {   
		setTimeout(function() {
			// Initialize the chart with a delay to make sure
			// the initial animation is visible
			grafDesRealizadoVenda("#chtGrafDesRealizadoVendaLoja");
			$("#grafDesRealizadoLoja-view").bind("kendo:skinChange", function(e) {
				grafDesRealizadoVenda("#chtGrafDesRealizadoVendaLoja");
			});
		}, 100);
	};
    
	function GrafDesRealizadoTurnoShow() {     
		setTimeout(function() {
			// Initialize the chart with a delay to make sure
			// the initial animation is visible
			grafDesRealizadoVenda("#chtGrafDesRealizadoVendaTurno");
			$("#grafDesRealizadoTurno-view").bind("kendo:skinChange", function(e) {
				grafDesRealizadoVenda("#chtGrafDesRealizadoVendaTurno");
			});
		}, 100);
	};
	
	//Gráfico Desempenho de Vendas Realizado
	function grafDesRealizadoVenda(e) {
		$(e).kendoChart({
			chartArea: {
				height: 355
			},
			dataSource: dsDesRealizadoCol,
			title: {
				text: "Minhas vendas - Realizado"
			},
			legend: {
				position: "bottom"
			},
			seriesDefaults: {
				type: "column"
			},
			series:[
				{
					//field: "MetaRealizadoAcumulado",
					field: "MetaRealizadoVlVenda",
					name: "Acum (R$)",
					color: "#0000FF"
				}
			],
			categoryAxis: {				
				field: "MetaHora",                
				labels: {
					template: "#= kendo.toString(value.substring(0, 5)) # ",					                  
					rotation: -90
				},
				majorGridLines: {
					visible: false
				}
			},
			valueAxis: {
				labels: {
					format: "R$ {0}",
					skip: 1,
					step: 1
				},
				line: {
					visible: true
				}
			},
			tooltip: {
				visible: true,
				template: "R$ #= kendo.format('{0:N2}', value) #",
				color: "#2d8402"                
			}
		});        
	}
  
	$.extend(window, {
		viewModelConsultas: viewModelConsultas,
		desRealizadoColShow: desRealizadoColShow,
		desRealizadoLojaShow: desRealizadoLojaShow,
		desRealizadoTurnoShow: desRealizadoTurnoShow,
        
		GrafDesRealizadoColShow: GrafDesRealizadoColShow,
		GrafDesRealizadoLojaShow: GrafDesRealizadoLojaShow,
		GrafDesRealizadoTurnoShow: GrafDesRealizadoTurnoShow
		
	});
})(jQuery);