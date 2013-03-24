(function($, undefined) {
	
	//Url
	//var baseUrl = "http://localhost:50000/api";
    var baseUrl = "http://revenuemachine11.provisorio.ws/api"

	//schema
	var schemaVendedores = { 
		model: {
			id: "FilaLojId",
			fields: {
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
			
	//Schema Atendimento
	var schemaAtendimento = { 
		model: {
			id: "IdAtendimento",
			fields:{
				IdAtendimento: { type: "int", validation: { required: true, min: 0} },
				IdVendedor: { type: "int", validation: { required: true, min: 0} },
				ValorVenda: { type: "number", validation: { required: true, min: 0} },						
				QtdeDePecas: { type: "number", validation: { required: true, min: 0} }
			} 
		}
	};
			
	//schemaMotivosSaidaSalao
	var schemaMotivosSaida = { 
		model: {
			id: "idMotivo",
			fields: {
				idMotivo: { editable: false, nullable: false },
				Motivo: { editable: false, nullable: false }
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
				url: baseUrl + "/Motivos",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
		},
		batch: true,
		schema: schemaMotivosSaida
	});
			
	//dataSource Atendimento
	var dsAtendimento = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/Atendimento/1",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			create: {
				url:baseUrl + "/Atendimento"													
				,type:"POST"                            
				,contentType:"application/json"
				,dataType: "json" 
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {							
					return kendo.stringify(data.models[0]);
				}
			}
		},
		batch: true,
		schema: schemaAtendimento
	});
			
	var viewModel = kendo.observable({
		
		dsVendFila: dsVendFila,		
		dsVendForaFila: dsVendForaFila,
		dsVendForaTurno: dsVendForaTurno,
		dsTiposMovto: dsTiposMovto,        
		dsAtendimento: dsAtendimento,     
        
		vendedorSelecionado: [],		
		atendimento: [],
        
		salvarAtendimento: salvarAtendimento,
		cancelarAtendimento: cancelarAtendimento,
        
		vendedoresFila: vendedoresFila,
		vendedoresForaFila: vendedoresForaFila,
		vendedoresForaTurno: vendedoresForaTurno,
		tiposMovto: tiposMovto
		
	});
    
	function atendimento(e) {
		var novoAtendimento = this.dsAtendimento.add(); 
		viewModel.set("atendimento", novoAtendimento); 
			
		var vendedor = viewModel.dsVendFila.get(e.context);
		viewModel.set("vendedorSelecionado", vendedor); 				
		viewModel.imageSrc = viewModel.vendedorSelecionado.Foto;
			
		console.log(viewModel.vendedorSelecionado.Foto);
		console.log(viewModel.imageSrc);
		console.log(viewModel);
			
		app.navigate("#resultadoAtendimento"); 
	}
			
	function salvarAtendimento (e) {
		if (validator.validate()) { //validates the input
			this.dsAtendimento.sync(); 	                
			
			//Atualiza a posicao do vendedor na fila
			var vend = viewModel.vendedorSelecionado;			
			
			this.dsVendFila.remove(vend); 
			this.dsVendFila.sync(); 
			
			vendedoresFila();
			app.navigate("#vdentroFila");
		}
	}
			
	function cancelarAtendimento() {
		this.dsAtendimento.cancelChanges(); 
		app.navigate("#vdentroFila");                 
	}
			
	function editorViewInit(e) {
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
		app.navigate("#motivosSaida");			
		dsTiposMovto.options.transport.read.url = baseUrl + "/Motivos";
		dsTiposMovto.read(); 
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
		viewModel: viewModel 
	});
})(jQuery);