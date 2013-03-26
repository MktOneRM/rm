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
	   
	//Schema Atendimento
	var schemaAtendimento = { 
		model: {
			id: "RepId",
			fields:{
				RepId:  { editable: false, nullable: false, defaultValue:0 },
				RLoId: { type: "int", validation: { required: true} },            
				LCoId: { type: "int", validation: { required: true} },            
				DtHrTransacao: { type: "datetime", validation: { required: true} },            
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
				LojId: { editable: false, nullable: false },
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
			
	//dataSource
	var dsTiposMovto = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmTipoMovimento",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
		},
		batch: true,
		schema: schemaTiposMovto
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
    
	var viewModel = kendo.observable({
		
		dsVendFila: dsVendFila,		
		dsVendForaFila: dsVendForaFila,
		dsVendForaTurno: dsVendForaTurno,
		dsTiposMovto: dsTiposMovto,        
		dsAtendimento: dsAtendimento,  
		dsLoja: dsLoja,
        
		vendedorSelecionado: {},		
		atendimento: {},
		lojaSelecionada: [],
        
		salvarAtendimento: salvarAtendimento,
		cancelarAtendimento : cancelarAtendimento,
        
		vendedoresFila : vendedoresFila,
		vendedoresForaFila : vendedoresForaFila,
		vendedoresForaTurno : vendedoresForaTurno,
		tiposMovtoSaida : tiposMovtoSaida,
		tiposMovtoEntrada : tiposMovtoEntrada,        
		lojas: lojas
		
	});
    
	function atendimento() {
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
			
			app.navigate("views/VFilaView.html");
		}
	}
			
	function cancelarAtendimento() {
		this.dsAtendimento.cancelChanges(); 
		app.navigate("#views/VFilaView.html");                 
	}
			
	function editorViewInit() {
		validator = $("#form").kendoValidator({ //initialize the validator
			messages: {
				required: function(input) { //create a custom message function
					input.attr("placeholder", input.attr("name") + " é obrigatório");
				}
			}
		}).data("kendoValidator");
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
    
	function tiposMovto() {
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
    
	function atualizaFilaNoSalao(context, parametro) {
		context.options.transport.read.url = baseUrl + "/RmFilaLoja/" + parametro;					
		context.read();
	}
    
	$.extend(window, {
		showVendedoresFila: vendedoresFila,
		showVendedoresForaFila: vendedoresForaFila,
		showVendedoresForaTurno: vendedoresForaTurno,
        
		showTiposMovto: tiposMovto,
		showTiposMovtoSaida: tiposMovtoSaida,
		showTiposMovtoEntrada: tiposMovtoEntrada,
        
		showAtendimento: atendimento,
		editorViewInit: editorViewInit,
        
		showLojas: lojas,
        
		viewModel: viewModel 
	});
})(jQuery);