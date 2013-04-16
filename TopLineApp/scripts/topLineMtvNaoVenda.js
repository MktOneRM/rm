(function($, undefined) {
	
    var baseUrl = "http://revenuemachine.hospedagemdesites.ws/mobile/api";
	//var baseUrl = "http://localhost:50000/api";

	//Schema Motivos não venda
	var scMotivosNaoVenda = { 
		model: {
			id: "MnvId",
			fields: {
				MnvId: { editable: false, nullable: false, defaultValue: 0 },
				MnvDescricao: { editable: false, nullable: false, defaultValue: "" }
			} 
		} 
	};

	//Schema Não venda
	var scNaoVenda = { 
		model: {
			id: "NveId",
			fields: {
				NveId: { type:"int", nullable: false, defaultValue: 0 },
				RLojId: { type:"int", nullable: false },
				LojId: { type:"int", nullable: false },
				MnvId: { type:"int", nullable: false },
				RveDtNaoVenda: { type:"date", nullable: false },
				LcoId: { type:"int", nullable: false }
			} 
		} 
	};

	//dataSource motivos não venda
	var dsMotivosNaoVenda = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmMotNaoVenda",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}
		},
		batch: true,
		schema: scMotivosNaoVenda,
        change: function(e){
             viewModelNaoVenda.set("motivos", this.view());   
        }        
        
	});
    
	//dataSource Não Venda
	var dsNaoVenda = new kendo.data.DataSource({                    
		transport: {						
			create:  {
				url: baseUrl + "/RmNaoVenda",							
				type:"POST"      
				,contentType: "application/json"
				,dataType: "json"
			},			
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify(data.models[0]);
				}
			}
		},
		batch: true,
		schema: scNaoVenda
	});
    
	var viewModelNaoVenda = kendo.observable({		
		dsMotivosNaoVenda: dsMotivosNaoVenda,
		dsNaoVenda: dsNaoVenda,
		motivosNaoVenda: motivosNaoVenda,
		motivoNaoVenda: {},        
        motivos: [],
        motivo: [],
		vendedorSelecionado: {},
		salvarNaoVenda: salvarNaoVenda,
		cancelarNaoVenda: cancelarNaoVenda
	});

	function salvarNaoVenda() {
        
		var RLoId = viewModel.vendedorSelecionado.get("RedeLojId");
		var LcoId = viewModel.vendedorSelecionado.get("LojaColId");
		var LojId = viewModel.vendedorSelecionado.get("LojId");
                
		viewModelNaoVenda.motivoNaoVenda.set("RLojId", RLoId);
		viewModelNaoVenda.motivoNaoVenda.set("LcoId", LcoId);
		viewModelNaoVenda.motivoNaoVenda.set("LojId", LojId);
		viewModelNaoVenda.motivoNaoVenda.set("MnvId", parseInt(viewModelNaoVenda.motivo[0].MnvId));
        
		viewModelNaoVenda.dsNaoVenda.sync(); 	                
        
		//Marca o checkbox como default
		document.getElementById("chkVendeu").checked = "checked";
        
		app.navigate("dentroFila-view");
	}
			
	function cancelarNaoVenda() {
		viewModelNaoVenda.dsNaoVenda.cancelChanges();         
		document.getElementById("chkVendeu").checked = "checked";
		app.navigate("#dentroFila-view");                 
	}
    
	function motivosNaoVenda() {		
		dsMotivosNaoVenda.options.transport.read.url = baseUrl + "/RmMotNaoVenda";
		dsMotivosNaoVenda.read(); 
		var naoVenda = viewModelNaoVenda.dsNaoVenda.add(); 
		viewModelNaoVenda.set("motivoNaoVenda", naoVenda); 
	}

	$.extend(window, {
		showMotivosNaoVenda: motivosNaoVenda,
		viewModelNaoVenda: viewModelNaoVenda
	});
})(jQuery);