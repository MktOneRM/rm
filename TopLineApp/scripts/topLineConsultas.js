(function($, undefined) {
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	//var baseUrl = "http://localhost:50000/api";
    
	kendo.data.binders.date = kendo.data.Binder.extend({
		init: function (element, bindings, options) {
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
 
			this.dateformat = $(element).data("dateformat");
		},
		refresh: function () {
			var data = this.bindings["date"].get();
			if (data) {
				var dateObj = new Date(data);
				$(this.element).text(kendo.toString(dateObj, this.dateformat, "pt-BR") + " Vendas - Até " +  kendo.toString(new Date(), "HH:mm") + " Hs");
			}
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
						lojaId: 1,
						hfuId: 1, 
						lojaColId: 2,
						noDia: false, 
						ateData: false
					}
				}
				else if (operation !== "read" && data.models) {							
					return kendo.stringify(data.models[0]);
				}
			}
		},
		batch: true,
		schema: scDesRealizadoCol,
	});
    
	var viewModelConsultas = kendo.observable({	
		dsDesRealizadoCol: dsDesRealizadoCol,
		dataAtual: ""
	})
    
	function desRealizadoColShow() {	
		viewModelConsultas.set("dataAtual", new Date());
	}
    
	$.extend(window, {
		viewModelConsultas: viewModelConsultas,
        desRealizadoColShow: desRealizadoColShow
	});
})(jQuery);