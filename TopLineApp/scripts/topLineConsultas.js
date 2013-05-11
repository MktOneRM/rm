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
			console.log(value.substring(0,5));
			if (value) {
				$(this.element).text(kendo.toString(value.substring(0,5)));
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
	var scDesRealizadoCol = { 
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
		schema: scDesRealizadoCol,
		change: function(e) {
			viewModelConsultas.set("resultado", this.view());
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
		viewModelConsultas.set("turnoSelecionado", viewModel.get("turnoSelecionado"));
		viewModelConsultas.set("colaboradorSelecionado", viewModel.get("colaboradorSelecionado"));
        
		viewModelConsultas.set("pLojId", viewModelConsultas.lojaSelecionada.LojId); 
		
		if (viewModelConsultas.turnoSelecionado.TufId) {
			viewModelConsultas.set("pTufId", viewModelConsultas.turnoSelecionado.TufId); 
		}
        
		if (viewModelConsultas.colaboradorSelecionado.ColId) {
			viewModelConsultas.set("pLojColId", viewModelConsultas.colaboradorSelecionado.LCoId); 
		}
        
		//Efetua a leitura do Datasource.
		dsDesRealizadoCol.read();
	}
    
	$.extend(window, {
		viewModelConsultas: viewModelConsultas,
		desRealizadoColShow: desRealizadoColShow
	});
})(jQuery);