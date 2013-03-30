(function($, undefined) {
	kendo.data.binders.srcPath = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["srcPath"].get();

			if (value) { 
				$(this.element).attr("src", "data:image/png;base64," + value); 
			}
		}
	});

	kendo.data.binders.format = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["format"].get();

			if (value) {
				$(this.element).text(kendo.toString(value, "c"));
			}
		}
	});

	kendo.data.binders.innerText = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["innerText"].get();

			if (value) {
				$(this.element).text("Vendedor : " + value);
			}
		}
	});
 
	var baseUrl = "http://revenuemachine11.provisorio.ws/api"
	//var baseUrl = "http://localhost:50000/api";

	//schema
	var schemaVendedores = { 
		model: {
			id: "FilaLojId",
			fields: {
				RedeLojId: { editable: false, nullable: false },
				LojaColId: { editable: false, nullable: false },
				FilaLojOrdem: { editable: false, nullable: false },
				ColApelido: { editable: false, nullable: false },
				ColNome: { editable: false, nullable: false },           
				ColSobreNome: { editable: false, nullable: false },
				ColFoto: { editable: false, nullable: false },                        
				ExpHInicial: { editable: false, nullable: false },
				ExpHFinal: { editable: false, nullable: false },                        
				EmFila: { editable: false, nullable: false },
				EmFolga: { editable: false, nullable: false },
				EmAfastamento: { editable: false, nullable: false },
			} 
		}
	};
		    			
	//schemaMotivosSaidaSalao
	var schemaTiposMovto = { 
		model: {
			id: "TmoId",
			fields: {
				TmoId: { editable: false, nullable: false },
				TmoDescricao: { editable: false, nullable: false }
			} 
		} 
	};
	  
	//Schema turnos de Turnos de funcionamento
	var schemaTurnosFunc = { 
		model: {
			id: "TufId",
			fields: {
				TufId: { editable: false, nullable: false },
				TufDescricao: { editable: false, nullable: false }
			} 
		}
	};
    
	//Schema de cargos
	var schemaCargos = { 
		model: {
			id: "CarId",
			fields: {
				CarId: { editable: false, nullable: false },
				CarDescricao: { editable: false, nullable: false }
			} 
		}
	};
	
	//Schema Atendimento
	var schemaAtendimento = { 
		model: {
			id: "RepId",
			fields:{
				RepId:  { editable: false, nullable: false, defaultValue:0 },
				RLoId: { type: "int", validation: { required: true} },            
				LCoId: { type: "int", validation: { required: true} },            
				DtHrTransacao: { type: "date", validation: { required: true} },            
				RepQtde: { type: "number", validation: { required: true, min: 0} },						
				RepValor: { type: "number", validation: { required: true, min: 0} }
			} 
		}
	};

	//schema    
	var scLoja = { 
		model: {
			id: "LojId",
			fields: {
				LojId: { type: "int", editable: false, nullable: false , defaultValue:0},
				TloId: { editable: false, nullable: false },
				LojCnpj: { editable: false, nullable: false },
				LojCodigo: { editable: false, nullable: false },
				LojRazaoSocial: { editable: false, nullable: false },           
				LojNomeFantasia: { editable: false, nullable: false },
				LojDDD: { editable: false, nullable: false },                        
				LojTelefone: { editable: false, nullable: false },
				LojLogradouro: { editable: false, nullable: false },                        
				LojNumero: { editable: false, nullable: false },
				LojComplemento: { editable: false, nullable: false },
				LojBairro: { editable: false, nullable: false },
				LojCidade: { editable: false, nullable: false },
				LojUF: { editable: false, nullable: false },
				LojCep: { editable: false, nullable: false },           				
				LojShopping_rua: { editable: false, nullable: false },                        
				LojFranquia: { editable: false, nullable: false },				
				LojDtCadastro: { editable: false, nullable: false },
				LojLatitude: { editable: false, nullable: false },
				LojLongitude: { editable: false, nullable: false }
			}     
		}
	};
    
	var scColaborador = {
		model:{
			id: "ColId",
			fields: {
				ColId: { type: "int", editable: false, nullable: false, defaultValue:0},
				CarId: { type: "int", validation: { required: false} },  
				ColCpf: { validation: { required: true} },
				ColApelido:  { validation: { required: true} },
				ColNome:  { validation: { required: true} },
				ColSobrenome:  { validation: { required: true} },
				ColDtnascimento: { type: "date", validation: { required: false} },  
				ColEmail: { validation: { required: false} },
				ColFoto: { validation: { required: false} },
				ColDtentrada:{ type: "date", validation: { required: true} },  
				ColDtsaida: { type: "date", validation: { required: false} },  
				ColAfasttemp: { type: "boolean",  defaultValue: false },                  
				LojId: { type: "int", validation: { required: true} },  
				ColSenha: { validation: { required: false} },
				ColHfuId: { type: "int", validation: { required: false} },  
				ColStatus: { type: "boolean",  defaultValue: false }                
			}
		}
	};
    
	//dataSource
	var dsVendFila = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmFilaLoja/1",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			} 
			,
			update: {
				url:baseUrl + "/RmFilaLoja/1",							
				type:"PUT"
				,contentType:"application/json"
				,dataType: "json"
			},
			destroy: {
				url:baseUrl + "/RmFilaLoja"                            
				,type:"DELETE"
				,contentType:"application/json"   
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}                 
		},
		batch: true,
		schema: schemaVendedores,                    
		sort: {
			field:
			"FilaLojId", dir
			: "asc"
		}
	});
			
	//dataSource
	var dsVendForaFila = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmFilaLoja/2",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			update: {
				url: baseUrl + "/RmFilaLoja/2",							
				type:"PUT"
				,contentType:"application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}
		},
		batch: true,
		schema: schemaVendedores,					
		sort: { 
			field: 
			"VendedorNome", dir: 
			"asc" 
		}	
	});
			
	//dataSource
	var dsVendForaTurno = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmFilaLoja/3",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			update: {
				url: baseUrl + "/RmFilaLoja/3",							
				type:"PUT"
				,contentType:"application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}                        
		},             
		batch: true,
		schema: schemaVendedores,
		serverPaging: true,
		sort: { field: "VendedorNome", dir: "asc" }	
	});
			
	//dataSource tipos de movimentação
	var dsTiposMovto = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmTipoMovimento",							
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
		schema: schemaTiposMovto
	});
			
	//dataSource Turnos de funcionamento
	var dsTurnosFunc = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmTurnoFunc",							
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
		schema: schemaTurnosFunc
	});
    
	//dataSource de cargos
	var dsCargos = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmCargo",							
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
		schema: schemaCargos
	});
    
	//dataSource Atendimento
	var dsAtendimento = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmAtendimentoRepositorio",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			create: {
				url:baseUrl + "/RmAtendimentoRepositorio"													
				,type:"POST"                            
				,contentType:"application/json"
				,dataType: "json" 
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {							
					return kendo.stringify([data.models[0]]);
				}
			}
		},
		batch: true,
		schema: schemaAtendimento
	});
		
	//<!--Atendimento-->
    
	function listViewInitFila(e) {
		e.view.element.find("#listviewFila").kendoMobileListView({
			dataSource: dsVendFila,
			template: $("#tdentroFila").html()
		})
         
		.kendoTouch({
			filter: ">li",
			enableSwipe: true,
			touchstart: touchstart,
			tap: navigate,
			swipe: swipe
		});
	}

	function navigate(e) {
		var itemUID = $(e.touch.currentTarget).data("uid");
		var schemaVendedores = viewModel.dsVendFila.getByUid(itemUID);
		viewModel.set("vendedorSelecionado", schemaVendedores);
		adicionarAtendimento();
		validator = $("#formAtendimento").kendoValidator({}).data("kendoValidator");
		app.navigate("#resultadoAtendimento-view");
	}

	function swipe(e) {
		var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
		button.expand().duration(200).play();
	}

	function touchstart(e) {
		var target = $(e.touch.initialTouch),
		listviewFila = $("#listviewFila").data("kendoMobileListView"),
		button = $(e.touch.target).find("[data-role=button]:visible");

		if (target.closest("[data-role=button]")[0]) {
			app.navigate("#sairdaFila_View");
    
			//prevent `swipe`
			this.events.cancel();
			e.event.stopPropagation();
		}
		else if (button[0]) {
			button.hide();

			//prevent `swipe`
			this.events.cancel();
		}
		else {
			listviewFila.items().find("[data-role=button]:visible").hide();
		}
	}
    
	//dataSource    
	var dsLoja = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmLoja",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			} 
			,
			update: {
				url:baseUrl + "/RmLoja",							
				type:"PUT"
				,contentType:"application/json"
				,dataType: "json"
			},
			destroy: {
				url:baseUrl + "/RmLoja"                            
				,type:"DELETE"
				,contentType:"application/json"   
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}                 
		},
		batch: true,
		schema: scLoja
	})
    
	//DataSource Colaborador
	var dsColaborador = new kendo.data.DataSource({
		transport: {
			read: {
				url: baseUrl + "/RmColaborador",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			},
			create: {
				url: baseUrl + "/RmColaborador",							
				type:"POST",
				contentType: "application/json",
				dataType: "json"
			},
			update: {
				url: baseUrl + "/RmColaborador",							
				type:"PUT",
				contentType: "application/json",
				dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}     
		},
		batch: true,
		sort: { field: "ColApelido", dir: "desc" },
		schema: scColaborador
	})
    
	var viewModel = kendo.observable({		
		dsVendFila: dsVendFila,		
		dsVendForaFila: dsVendForaFila,
		dsVendForaTurno: dsVendForaTurno,
		dsTiposMovto: dsTiposMovto,        
		dsAtendimento: dsAtendimento,  
		dsLoja: dsLoja,
		dsColaborador: dsColaborador,	
		dsCargos: dsCargos,
		dsTurnosFunc: dsTurnosFunc,	
        
		vendedorSelecionado: {},		
		atendimento: {},
		lojaSelecionada: {},
		colaboradorSelecionado: {},
		cargoSelecionado: {},
		turnoSelecionado: {},
		        
		salvarAtendimento: salvarAtendimento,
		cancelarAtendimento : cancelarAtendimento,
        
		adicionarColaborador: adicionarColaborador,
		detalhesColaborador: detalhesColaborador,
		salvarColaborador: salvarColaborador,
		editarColaborador: editarColaborador,
		cancelarColaborador: cancelarColaborador,
        
		vendedoresFila : vendedoresFila,
		vendedoresForaFila : vendedoresForaFila,
		vendedoresForaTurno : vendedoresForaTurno,
		tiposMovtoSaida : tiposMovtoSaida,
		tiposMovtoEntrada : tiposMovtoEntrada,        
		lojas: lojas,
		listViewInitFila: listViewInitFila
		
	});

	function adicionarAtendimento() {
		var novoAtendimento = viewModel.dsAtendimento.add(); 
		viewModel.set("atendimento", novoAtendimento); 
	}

	function salvarAtendimento () {
		if (validator.validate()) { //validates the input
			//Busca o código da Rede da Loja
			var RLoId = viewModel.vendedorSelecionado.get("RedeLojId");
            
			//Busca o código da Loja do Colaborador
			var LcoId = viewModel.vendedorSelecionado.get("LojaColId");
            
			viewModel.atendimento.set("RLoId", RLoId);
			viewModel.atendimento.set("LcoId", LcoId);
            
			this.dsAtendimento.sync(); 	                
			
			//Atualiza a posicao do vendedor na fila
			var vend = viewModel.vendedorSelecionado;			
			this.dsVendFila.remove(vend); 
			this.dsVendFila.sync(); 
		}
	}
			
	function cancelarAtendimento() {
		viewModel.dsAtendimento.cancelChanges(); 
		app.navigate("#dentroFila-view");                 
	}
    
	function adicionarColaborador() {
		var novoColaborador = viewModel.dsColaborador.add();
		viewModel.set("colaboradorSelecionado", novoColaborador);
		app.navigate("#editorColaborador-view");
	}
       
	function detalhesColaborador(e) {
		var colaborador = viewModel.dsColaborador.get(e.context);                 
		viewModel.set("colaboradorSelecionado", colaborador);  
		app.navigate("#detalhesColaborador-view");
	}
    
	function editarColaborador(e) {
		var colaborador = viewModel.dsColaborador.get(e.context);                 
		viewModel.set("colaboradorSelecionado", colaborador);  
		app.navigate("#editorColaborador-view"); 
	}
    
	function salvarColaborador() {   
		//if (validator.validate()) {
		viewModel.dsColaborador.sync();
		//app.navigate("#colaboradores-view"); 
        $("#colaboradores-view").data("kendoListView").refresh();
		app.navigate("#:back");          
		//}
	}
	    
	function cancelarColaborador() {
		viewModel.dsColaborador.cancelChanges();
		//app.navigate("#colaboradores-view");
        app.navigate("#:back");
	}
 
	function vendedoresFila() {
		atualizaFilaNoSalao(dsVendFila, 1);
	}
			
	function vendedoresForaFila() {	
		atualizaFilaNoSalao(dsVendForaFila, 2);
	}
			
	function vendedoresForaTurno() {
		atualizaFilaNoSalao(dsVendForaTurno, 3);
	}
    
	function tiposMovto(e) {
		var vendedor = viewModel.dsVendFila.get(e.context);
		viewModel.set("vendedorSelecionado", vendedor); 	
	}
			
	function tiposMovtoEntrada() {		
		dsTiposMovto.options.transport.read.url = baseUrl + "/RmTipoMovimento/true";
		dsTiposMovto.read(); 
	}
	
	function tiposMovtoSaida() {		
		dsTiposMovto.options.transport.read.url = baseUrl + "/RmTipoMovimento/false";
		dsTiposMovto.read(); 
	}
    
	function lojas() {	
		dsLoja.options.transport.read.url = baseUrl + "/RmLoja";
		dsLoja.read(); 
	}
  
	function turnoFunc() {	
		dsTurnoFunc.options.transport.read.url = baseUrl + "/RmTurnosFunc";
		dsTurnoFunc.read(); 
	}
    
	function cargos() {	
		dsCargo.options.transport.read.url = baseUrl + "/RmCargo";
		dsCargo.read(); 
	}
    
	function colaboradores() {
		dsColaborador.options.transport.read.url = baseUrl + "/RmColaborador";
		dsColaborador.read(); 		
	}
    
	function atualizaFilaNoSalao(context, parametro) {
		context.options.transport.read.url = baseUrl + "/RmFilaLoja/" + parametro;					
		context.read();
	}
    
	function editorViewInit(e) {
		var view = e.view;
		view.element.find("#done").data("kendoMobileButton").bind("click", function() {
			viewModel.dsAtendimento.one("change", function() {
				view.loader.hide();
				app.navigate("#:back");
			});

			view.loader.show();
			salvarAtendimento();
		});

		view.element.find("#cancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			viewModel.dsAtendimento.one("change", function() {
				view.loader.hide();
				app.navigate("#:back");
			});

			view.loader.show();
			viewModel.dsAtendimento.cancelChanges();
		});
	}

	function editorViewInitCol() {
		validator = $("#formColaborador").kendoValidator({}).data("kendoValidator");
	}
    
	$.extend(window, {
		showVendedoresFila: vendedoresFila,
		showVendedoresForaFila: vendedoresForaFila,
		showVendedoresForaTurno: vendedoresForaTurno,
        
		showTiposMovto: tiposMovto,
		showTiposMovtoSaida: tiposMovtoSaida,
		showTiposMovtoEntrada: tiposMovtoEntrada,
  
		showLojas: lojas,     
		showTurnoFunc: turnoFunc,
		showCargos: cargos,
  
		showColaboradores: colaboradores,
		showDetalhesColaborador: detalhesColaborador,     
        
		showAtendimento: adicionarAtendimento,
		listViewInitFila: listViewInitFila,
		editorViewInit: editorViewInit,
		viewModel: viewModel
		
        
	});
})(jQuery);