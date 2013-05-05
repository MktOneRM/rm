(function($, undefined) {
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
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
		change: function(e) {         
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
		motivoNaoVenda: {},        
		motivos: [],
		motivo: [],
		vendedorSelecionado: {},
		naoVendaViewInit: naoVendaViewInit,
		naoVendaViewShow: naoVendaViewShow
	});

	function naoVendaViewInit(e) {
		var view = e.view;
        
		view.element.find("#salvarMaior").data("kendoMobileButton").bind("click", function() {	
			viewModelNaoVenda.dsNaoVenda.one("change", function() {	
				//Marca o checkbox como default
				document.getElementById("chkVendeu").checked = "checked";
				view.loader.hide();				
				app.navigate("#dentroFila-view"); 
			});
      
             console.log("View: " , viewModelNaoVenda);
            
			view.loader.show();
			viewModelNaoVenda.dsNaoVenda.sync();
		});
        
		view.element.find("#cancelarMaior").data("kendoMobileButton").bind("click", function(e) {
			e.preventDefault();
			viewModelNaoVenda.dsNaoVenda.one("change", function() {
				document.getElementById("chkVendeu").checked = "checked";
				view.loader.hide();
				app.navigate("#dentroFila-view");
			});

			view.loader.show();
			viewModelNaoVenda.dsNaoVenda.cancelChanges();			
		});
	}
    
	function naoVendaViewShow() {
		var RLoId = viewModel.vendedorSelecionado.get("RedeLojId");
		var LcoId = viewModel.vendedorSelecionado.get("LojaColId");
		var LojId = viewModel.vendedorSelecionado.get("LojId");
          
		var naoVenda = viewModelNaoVenda.dsNaoVenda.add(); 
        
        console.log("Nao Venda: " , naoVenda);
        
		viewModelNaoVenda.set("motivoNaoVenda", naoVenda); 
		viewModelNaoVenda.motivoNaoVenda.set("RLojId", RLoId);
		viewModelNaoVenda.motivoNaoVenda.set("LcoId", LcoId);
		viewModelNaoVenda.motivoNaoVenda.set("LojId", LojId);
		viewModelNaoVenda.motivoNaoVenda.set("MnvId", parseInt(viewModelNaoVenda.motivos[0].MnvId));
        
        console.log("Nao Venda preenchido " , viewModelNaoVenda.motivoNaoVenda);
        
	}
    
	$.extend(window, {
		viewModelNaoVenda: viewModelNaoVenda,
		naoVendaViewInit: naoVendaViewInit,
		naoVendaViewShow: naoVendaViewShow
	});
})(jQuery);