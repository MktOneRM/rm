(function($, undefined) {
    
	var baseUrl = "http://www.revenuemachine.com.br/mobile/api";
	//var baseUrl = "http://localhost:50000/api";
    
    kendo.data.binders.cep = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["cep"].get();
			if (value) {
				$(this.element).text(formatField(value, "99999-999"));
				viewModel.lojaSelecionada.set("LojCep", formatField(value, "99999-999"));
			}
		}        
	});
    
	kendo.data.binders.cpf = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["cpf"].get();
			if (value) {
				$(this.element).text(formatField(value, "999.999.999-99"));
				viewModel.colaboradorSelecionado.set("ColCpf", formatField(value, "999.999.999-99"));				
			}
		}
        
	});
            
	kendo.data.binders.cnpj = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["cnpj"].get();
			if (value) {
				$(this.element).text(formatField(value, "99.999.999/9999-99"));
				viewModel.lojaSelecionada.set("LojCnpj", formatField(value, "99.999.999/9999-99"));				
			}
		}
        
	});

	kendo.data.binders.telefoneText = kendo.data.Binder.extend({
		refresh: function() {
			var that = this,
			value = that.bindings["telefoneText"].get(); //get the value from the View-Model
			if (value) {
				if (value.trim().length == 11) {
					$(this.element).text(formatField(value, "(99) 99999-9999"));					
				}
				else if (value.trim().length == 10) {
					$(this.element).text(formatField(value, "(99) 9999-9999"));
				}
			}		
		}
	});

	kendo.data.binders.telefoneValue = kendo.data.Binder.extend({
		init: function(element, bindings, options) {
			//call the base constructor
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
			var that = this;
			//listen for the change event of the element
			$(that.element).on("change", function() {
				that.change(); //call the change function
			});
		},
		refresh: function() {
			var that = this,
            
			value = that.bindings["telefoneValue"].get(); //get the value from the View-Model	
			
			if (value) {
				if (value.trim().length == 11) {
					$(that.element).val(formatField(value, "(99) 99999-9999"));					
				}
				else if (value.trim().length == 10) {
					$(that.element).val(formatField(value, "(99) 9999-9999"));
				}
			}		
		},
		change: function() {			
			var value = this.element.value;			
			if (value.trim().length == 11) {
				value = formatField(value, "(99) 99999-9999");					
			}
			else if (value.trim().length == 10) {
				value = formatField(value, "(99) 9999-9999");
			}
			this.bindings["telefoneValue"].set(value);
		}
	});

	kendo.data.binders.ShopRua = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["ShopRua"].get();            
			if (value) {
				$(this.element).text("Shopping");
			}
			else {
				$(this.element).text("Rua");
			}
		}
	});
    
	kendo.data.binders.sexoText = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["sexoText"].get();            
			if (value == "M") {
				$(this.element).text("Masculino");
			}
			else if (value == "F") {
				$(this.element).text("Feminino");
			}
		}
	});
    
	kendo.data.binders.afastText = kendo.data.Binder.extend({
		refresh: function() {
			var value = this.bindings["afastText"].get();            
			if (value) {
				$(this.element).text("Sim");
			}
			else {
				$(this.element).text("Não");
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
 
	kendo.data.binders.qtde = kendo.data.Binder.extend({
		init: function(element, bindings, options) {
			//call the base constructor
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
			var that = this;
			//listen for the change event of the element
			$(that.element).on("change", function() {
				that.change(); //call the change function
			});
		},
		refresh: function() {
			var that = this,
			valor = that.bindings["qtde"].get(), //get the value from the View-Model
			formatedValue = kendo.toString(valor, "n0", "pt-BR"); //format
			$(that.element).val(formatedValue); //update the HTML input element
		},
		change: function() {
			var value = this.element.value;
			if (!isNaN(value)) {
				this.bindings["qtde"].set(value);
			}
		}
	});

	kendo.data.binders.valor = kendo.data.Binder.extend({
		init: function(element, bindings, options) {
			//call the base constructor
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
			var that = this;
			//listen for the change event of the element
			$(that.element).on("change", function() {
				that.change(); //call the change function
			});
		},
		refresh: function() {
			var that = this,
			value = that.bindings["valor"].get(), //get the value from the View-Model
			formatedValue = kendo.toString(value, "c", "pt-BR"); //format
			$(that.element).val(formatedValue); //update the HTML input element
		},
		change: function() {
			var value = this.element.value;
			if (!isNaN(value)) {
				this.bindings["valor"].set(value);
			}
		}
	});

	kendo.data.binders.dateText = kendo.data.Binder.extend({
		refresh: function() {
			var that = this,
			value = that.bindings["dateText"].get(); //get the value from the View-Model
			if (value) {
				formatedValue = kendo.toString(value, "dd/MM/yyyy", "pt-BR"); //format
				$(that.element).text(formatedValue); //update the HTML input element
			}     
		}
	});

	kendo.data.binders.dateValue = kendo.data.Binder.extend({
		init: function(element, bindings, options) {
			//call the base constructor
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
			var that = this;
			//listen for the change event of the element
			$(that.element).on("change", function() {
				that.change(); //call the change function
			});
		},
		refresh: function() {
			var that = this,
			value = that.bindings["dateValue"].get(); //get the value from the View-Model
			formatedValue = kendo.toString(value, "dd/MM/yyyy", "pt-BR"); //format
			$(that.element).val(formatedValue); //update the HTML input element
		},
		change: function() {
			var formatedValue = this.element.value;
			value = kendo.parseDate(formatedValue, "dd/MM/yyyy", "pt-BR");             
			this.bindings["dateValue"].set(value);
		}
	});

	//schema
	var schemaVendedores = { 
		model: {
			id: "FilaLojId",
			fields: {
				RedeLojId: { type: "int", validation: { required: false}, defaultValue: 0 },
				LojId: { type: "int"},
				FilaLojId: { type: "int", validation: { required: false}, defaultValue: 0 },
				LojaColId: { type: "int"},
				FilaLojOrdem: { type: "int", validation: { required: false}, defaultValue: 0 },
				ColApelido: { type: "text", validation: { required: false}, defaultValue: null },
				ColNome: { type: "text", validation: { required: false}, defaultValue: null },
				ColSobreNome: { type: "text" , validation: { required: false}, defaultValue: null },				
				ColFoto: { type: "text", validation: { required: false}, defaultValue: null },
				ColTurno: {type: "text", validation: { required: false}, defaultValue: null },
				ExpHInicial: { type: "time", validation: { required: false}, defaultValue: null },
				ExpHFinal: { type: "time", validation: { required: false}, defaultValue: null },
				EmFila: { type: "boolean" },
				EmFolga: { type: "boolean" },
				EmAfastamento: { type: "boolean" },
				SaidaFila: { type: "boolean" },
				EntradaFila: { type: "boolean" },
				TmoId: {type: "int", validation: { required: false}, defaultValue: 0 }
			} 
		}
	};
    
	var dataUf = [
		{ Uf: "AL",Desc:"Alagoas"},
		{ Uf: "AP",Desc:"Amapá"},
		{ Uf: "AM",Desc:"Amazonas"},
		{ Uf: "BA",Desc:"Bahia"},
		{ Uf: "CE",Desc:"Ceará"},
		{ Uf: "DF",Desc:"Distrito Federal"},
		{ Uf: "ES",Desc:"Espirito Santo"},
		{ Uf: "GO",Desc:"Goiás"},
		{ Uf: "MA",Desc:"Maranhão"},
		{ Uf: "MT",Desc:"Mato Grosso"},
		{ Uf: "MS",Desc:"Mato Grosso do Sul"},
		{ Uf: "MG",Desc:"Minas Gerais"},
		{ Uf: "PA",Desc:"Pará"},
		{ Uf: "PB",Desc:"Paraíba"},
		{ Uf: "PR",Desc:"Paraná"},
		{ Uf: "PE",Desc:"Pernambuco"},
		{ Uf: "PI",Desc:"Piauí"},
		{ Uf: "RJ",Desc:"Rio de Janeiro"},
		{ Uf: "RN",Desc:"Rio Grande do Norte"},
		{ Uf: "RS",Desc:"Rio Grande do Sul"},
		{ Uf: "RO",Desc:"Rondônia"},
		{ Uf: "RR",Desc:"Roraima"},
		{ Uf: "SC",Desc:"Santa Catarina"},
		{ Uf: "SP",Desc:"São Paulo"},
		{ Uf: "SE",Desc:"Sergipe"},
		{ Uf: "TO",Desc:"Tocantins"}
	];
    
	var scUf = {
		model:{
			id: "Uf",
			fields: {
				Uf: { type: "string"},
				Desc: { type: "string"}  
			}
		}
	};
    
	var dsUf = new kendo.data.DataSource({ 
		data: dataUf,
		schema: scUf,
		change: function (e) {			
			viewModel.set("UFs", this.view());
		}
	});

	var dataTLoja = [
		{ Id:true,Desc:"Shopping"},
		{ Id:false,Desc:"Rua"}
	];
    
	var scTLoja = {
		model:{
			id: "Id",
			fields: {
				Id: { type: "boolean"},
				Desc: { type: "string"}  
			}
		}
	};
    
	var dsTLoja = new kendo.data.DataSource({ 
		data: dataTLoja,
		schema: scTLoja,
		change: function (e) {			
			viewModel.set("TLojas", this.view());
		}
	});
    
	var dataSexo = [
		{ Id:"M",Desc:"Masculino"},
		{ Id:"F",Desc:"Feminino"}
	];
    
	var scSexo = {
		model:{
			id: "Id",
			fields: {
				Id: { type: "string"},
				Desc: { type: "string"}  
			}
		}
	};
    
	var dsSexo = new kendo.data.DataSource({ 
		data: dataSexo,
		schema: scSexo,
		change: function (e) {			
			viewModel.set("sexos", this.view());
		}
	});
    
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
	   
	//Schema Turnos de funcionamento
	var scTurnosFunc = { 
		model: {
			id: "TufId",
			fields: {
				TufId: { editable: false, nullable: false },
				TufDescricao: { editable: false, nullable: false }
			} 
		}
	};
    
	//Schema Dias da semana de funcionamento
	var scDiasFunc = { 
		model: {
			id: "DsfId",
			fields: {
				DsfId: { editable: false, nullable: false },
				DsfDescricao: { editable: false, nullable: false }
			} 
		}
	};
    
	//Schema de cargos
	var scEscala = { 
		model: {
			id: "EscId",
			fields: {
                EscId: { type: "int", defaultValue:0 },
				HfuId: { type: "int", validation: { required: true} },
				LojId: { type: "int", validation: { required: true} },
				TufId: { type: "int", validation: { required: true} },
				TufDescricao: { type: "int" },
				DsfId: { type: "int", validation: { required: true} },
				DsfDescricao: { type: "int" },
				EscHrInicial: { type: "time", validation: { required: true} },
				EscHrFinal: { type: "time",  validation: { required: true} }
			} 
		}
	};    
    
	//Schema de cargos
	var scCargos = { 
		model: {
			id: "CarId",
			fields: {
				CarId: { type: "int", validation: { required: true} },
				CarDescricao: { type: "string", validation: { required: true} },
			} 
		}
	};
    
	//Schema Atendimento
	var scAtendimento = { 
		model: {
			id: "RepId",
			fields:{
				RepId:  { type: "int", nullable: false, defaultValue:0 },
				LojId:  { type: "int", nullable: false, defaultValue:0 },
				RLoId: { type: "int", validation: { required: true}, defaultValue:0 },            
				LCoId: { type: "int", validation: { required: true}, defaultValue:0  },            
				DtHrTransacao: { type: "date", validation: { required: true}},            
				RepQtde: { type: "int", validation: { required: true, min: 1} },						
				RepValor: { type: "float", validation: { required: true, min: 0.01}}
			} 
		}
	};
    
	//schema    
	var scLoja = { 
		model: {
			id: "LojId",
			fields: {
				LojId: { type: "int", editable: false, nullable: false},
				TloId: { type: "int", validation: { required: false} },            
				LojCnpj: { type: "text", validation: { required: true} },            
				LojCodigo: { type: "text", validation: { required: true} },            
				LojRazaosocial: { type: "text", validation: { required: true} },                       
				LojNomefantasia: { type: "text", validation: { required: true} },            
				LojTelefone: { type: "text", validation: { required: false} },            
				LojLogradouro: { type: "text", validation: { required: false} },                                    
				LojNumero: { type: "text", validation: { required: false} },            
				LojComplemento: { type: "text", validation: { required: false} },            
				LojBairro: { type: "text", validation: { required: false} },            
				LojCidade: { type: "text", validation: { required: false} },            
				LojUf: { type: "text", validation: { required: false} },            
				LojCep: { type: "text", validation: { required: false,min:0,max:9} },                       				
				LojShopping_rua: { type: "boolean", validation: { required: false} },                                    								
				LojLatitude: { type: "text", validation: { required: false} },            
				LojLongitude: { type: "text", validation: { required: false} }, 
				LojDtcadastro:{ type: "date" },  
			}     
		}
	};
    
	var scColaborador = {
		model:{
			id: "ColId",
			fields: {
				ColId: { type: "int", editable: false, nullable: false, defaultValue:0},
				CarId: { type: "int", validation: { required: false} },  
				ColCpf: { validation: { required: true}},
				ColSexo: { validation: { required: true}, defaultvalue: "M"},
				ColApelido:  { validation: { required: true} },
				ColNome:  { validation: { required: true} },
				ColSobrenome:  { validation: { required: true} },
				ColDtnascimento: { type: "date", validation: { required: true} },  
				ColEmail: { validation: { required: false} },
				ColFoto: { type: "text", validation: { required: false}, defaultValue: null },
				ColDtentrada:{ type: "date", validation: { required: true} },  
				ColDtsaida: { type: "date",  validation: { required: false}, defaultValue: null },
				ColAfasttemp: { type: "boolean",  defaultValue: false },                  
				LojId: { type: "int", validation: { required: true} },  
				ColSenha: { validation: { required: false} },
				ColHfuId: { type: "int", validation: { required: false} }
			}
		}
	};
    
	var scTelColaborador = {
		model: {
			id: "TelId",
			fields: {                
				TelId: { type: "int", editable: false, nullable: false, defaultValue:0},
				ColId: { type: "int", nullable: false},
				TteId: { type: "int", validation: { required: true} },  
				TteDescricao: { type: "string", validation: { required: true} },
				TelNumero: { type: "string", validation: { required: true} },  
				OpeId: { type: "int", validation: { required: true}},  
				OpeDescricao: { type: "string", validation: { required: true} },                                
				TceId: { type: "int" , nullable: true},  
				TceDescricao: { type: "string" , nullable: true }
			}
		}
	}
    
	//Schema de cargos
	var scTelCompl = { 
		model: {
			id: "TipoConsulta",
			fields: {
				TipoConsulta: { editable: false, nullable: false },                
				IdTipo: { editable: false, nullable: false },
				DescricaoTipo: { editable: false, nullable: false },
			} 
		}
	};
    
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
			create: {
				url:baseUrl + "/RmFilaLoja/1",							
				type:"POST",
				contentType: "application/json",
				dataType: "json"
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
				type:"POST"
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
				type:"POST"
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
		schema: schemaTiposMovto,        
		change: function(e) {
			viewModel.set("motivos", this.view());   
		}       
	});

	//Dados para Turnos de Funcionamento.
	var dataTurnosFunc = [
		{ TufId:1, TufDescricao:"1º Turno"},
		{ TufId:2, TufDescricao:"2º Turno"},
		{ TufId:3, TufDescricao:"3º Turno"},
		{ TufId:3, TufDescricao:"4º Turno"},
		{ TufId:3, TufDescricao:"Turno Único"}
	];
    
	//dataSource Turnos de funcionamento
	var dsTurnosFunc = new kendo.data.DataSource({                    
		data: dataTurnosFunc,
		schema: scTurnosFunc,
		change: function(e) {
			viewModel.set("turnos", this.view());
		}
	});
    
	//Dados para Dias da Semana de Funcionamento
	var dataDiasFunc = [
		{ DsfId:1, DsfDescricao:"Segunda a Sexta"},
		{ DsfId:2, DsfDescricao:"Sábado"},
		{ DsfId:3, DsfDescricao:"Domingo/Feriado"}
	];
    
	//dataSource Dias da Semana de Funcionamento
	var dsDiasFunc = new kendo.data.DataSource({                    
		data: dataDiasFunc,
		schema: scDiasFunc,
		change: function(e) {
			viewModel.set("diasFunc", this.view());
		}
	});
    
	//dataSource para gravacao de Horarios Funcionamento
	var dsEscala = new kendo.data.DataSource({                    
		transport: {	
			read:  {
				url: baseUrl + "/RmEscalas",							
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			create:  {
				url: baseUrl + "/RmEscalas",							
				type:"POST"      
				,contentType: "application/json"
				,dataType: "json"
			},
			update:  {
				url: baseUrl + "/RmEscalas",							
				type:"PUT"      
				,contentType: "application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation == "read") {
					return {id: viewModel.lojaSelecionada.LojId}
				}
				else if (operation !== "read" && data.models) {
					return kendo.stringify(data.models);
				}
			}
		},
		batch: true,
		schema: scEscala,
		change:function(e) {
			viewModel.set("escalas", this.view());
		},                       
		sort: {
			field:"EscId", 
			dir: "asc"
		}
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
		schema: scCargos,
		change: function (e) {						
			viewModel.set("cargos", this.view());
		},                       
		sort: {
			field:"CarDescricao", 
			dir: "desc"
		}
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
					return kendo.stringify(data.models[0]);
				}
			}
		},
		batch: true,
		schema: scAtendimento,
	});
		
	//Datasource - Loja
	var dsLoja = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmLoja",
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			},
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
					return kendo.stringify(data.models[0]);
				}
			}                 
		},
		batch: true,
		schema: scLoja,
		change: function(e) {            
			viewModel.set("lojaSelecionada", e.items[0]);					
		},
		error: function(e) {			
			if (e.errorThrown == "Not Found") {
				adicionarLoja();                
			}
		}
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
    
	//DataSource Colaborador
	var dsTelColaborador = new kendo.data.DataSource({
		transport: {
			read: {
				url: baseUrl + "/RmTelColaborador",							
				type:"GET",
				contentType: "application/json",
				dataType: "json"
			},
			create: {
				url: baseUrl + "/RmTelColaborador",							
				type:"POST",
				contentType: "application/json",
				dataType: "json"
			},
			update: {
				url: baseUrl + "/RmTelColaborador",							
				type:"PUT",
				contentType: "application/json",
				dataType: "json"
			},
			destroy: {
				url: baseUrl + "/RmTelColaborador",							
				type:"DELETE",
				contentType: "application/json",
				dataType: "json"
			},
			parameterMap: function(data, operation) {
				if (operation !== "read" && data.models) {
					return kendo.stringify(data.models);
				}
			}     
		},
		batch: true,
		schema: scTelColaborador, 
		sort: {
			field:"TelId", 
			dir: "asc"
		},
		change:function(e) {
			viewModel.set("telefonesColaborador", this.view());
		}
	})
 
	//dataSource de cargos
	var dsTelCompl = new kendo.data.DataSource({                    
		transport: {						
			read:  {
				url: baseUrl + "/RmTelComplementos",
				type:"GET"      
				,contentType: "application/json"
				,dataType: "json"
			},
			parameterMap: function(data, operation) {                
				if (operation == "read") {
					return {id: viewModel.tipoCompl}
				}                
			}
		},
		batch: true,
		schema: scTelCompl,
		change: function (e) {	
			if (viewModel.tipoCompl == 1) {
				viewModel.set("tiposTels", this.view()); 
				viewModel.set("tipoCompl", 2);
				viewModel.dsTelCompl.read(); 
			} 
			else if (viewModel.tipoCompl == 2) {
				viewModel.set("tiposOper", this.view()); 
				viewModel.set("tipoCompl", 3);
				viewModel.dsTelCompl.read(); 
			}           
			else if (viewModel.tipoCompl == 3) {
				viewModel.set("tiposCel", this.view()); 
			}           
		},                       
		sort: {
			field:"DescricaoTipo", 
			dir: "desc"
		}
	});
    
	var viewModel = kendo.observable({		
		dsVendFila: dsVendFila,		
		dsVendForaFila: dsVendForaFila,
		dsVendForaTurno: dsVendForaTurno,
		dsTiposMovto: dsTiposMovto,        		
		dsAtendimento: dsAtendimento,  
		dsLoja: dsLoja,
		dsColaborador: dsColaborador,
        
		escalas: [],
		dsEscala: dsEscala,
        
		dsTelColaborador:dsTelColaborador,                
		dsTelCompl: dsTelCompl,
        
		diasFunc: [],
		dsDiasFunc: dsDiasFunc,
        
		tiposTels: [],
		tiposOper: [],
		tiposCel: [],
        
		tipoCompl: 0,
        
		cargos: [],
		dsCargos: dsCargos,
        
		UFs:[],
		dsUf: dsUf,
        
		sexos:[],
		dsSexo: dsSexo,
        
		turnos: [],
		dsTurnosFunc: dsTurnosFunc,        
		      
		TLojas:[],
		dsTLoja: dsTLoja,
		
		vendedorSelecionado: {},		
		atendimento: {},
		lojaSelecionada: {},
		colaboradorSelecionado: {},
		telefonesColaborador: [],
		cargoSelecionado: {},
		turnoSelecionado: {},
		salvarAtendimento: salvarAtendimento,
		cancelarAtendimento : cancelarAtendimento,
		adicionarColaborador: adicionarColaborador,
		detalhesColaborador: detalhesColaborador,				
		vendedoresFila : vendedoresFila,
		vendedoresForaFila : vendedoresForaFila,
		vendedoresForaTurno : vendedoresForaTurno,
		tiposMovtoSaida : tiposMovtoSaida,
		tiposMovtoEntrada : tiposMovtoEntrada,           
		lojas: lojas,
		initValidacao: initValidacao,
		formatField:formatField,
		onSwipe:onSwipe,
		onSwipeFora:onSwipeFora,
		editorColViewInit:editorColViewInit,
		onTouchstart:onTouchstart,
		onTouchstartFora:onTouchstartFora,
		onTouchstartTelefone:onTouchstartTelefone,
		editorLojaViewInit: editorLojaViewInit,
		salvarEdicaoLoja: salvarEdicaoLoja,
		cancelarEdicaoLoja: cancelarEdicaoLoja,
		validarCPF:validarCPF,	
		salvarSaida: salvarSaida,
		cancelarSaida:cancelarSaida,
  
		salvarEntrada: salvarEntrada,
		cancelarEntrada: cancelarEntrada,
        
		idLoja: null,        
		motivos: [],
		motivo: []
	});

	function adicionarAtendimento() {
		var novoAtendimento = viewModel.dsAtendimento.add();        
		viewModel.set("atendimento", novoAtendimento);         
	}

	function salvarAtendimento() {
		if (validatorAtendimento.validate()) { 
			var RLoId = viewModel.vendedorSelecionado.get("RedeLojId");            
			var LcoId = viewModel.vendedorSelecionado.get("LojaColId");
			var LojId = viewModel.vendedorSelecionado.get("LojId");
            
			viewModel.atendimento.set("RLoId", RLoId);
			viewModel.atendimento.set("LcoId", LcoId);
			viewModel.atendimento.set("LojId", LojId);            
			viewModel.dsAtendimento.sync(); 	                
			         
			app.navigate("#dentroFila-view");
		}
	}
			
	function cancelarAtendimento() {
		viewModel.dsAtendimento.cancelChanges(); 
		app.navigate("#dentroFila-view");                 
	}

	function salvarSaida() {
		viewModel.vendedorSelecionado.set("SaidaFila", true);
		viewModel.vendedorSelecionado.set("TmoId", parseInt(viewModel.motivo[0].TmoId));
		viewModel.dsVendFila.remove(viewModel.vendedorSelecionado); 
		viewModel.dsVendFila.sync();
		app.navigate("#dentroFila-view");
	}
    
	function cancelarSaida() {
		viewModel.dsVendFila.cancelChanges();
		app.navigate("#dentroFila-view");                 
	}
    
	function salvarEntrada() {
		var LojId = viewModel.vendedorSelecionado.get("LojId");
		var LojaColId = viewModel.vendedorSelecionado.get("LojaColId");
        
		var entrada = viewModel.dsVendFila.add(); 		
        
		viewModel.set("vendedorSelecionado", entrada);        
		viewModel.vendedorSelecionado.set("LojId", LojId);
		viewModel.vendedorSelecionado.set("LojaColId", LojaColId);        
		viewModel.vendedorSelecionado.set("EntradaFila", 1);		
		viewModel.vendedorSelecionado.set("TmoId", parseInt(viewModel.motivo[0].TmoId));
        
		viewModel.dsVendFila.sync();
        
		app.navigate("#dentroFila-view");
	}
    
	function cancelarEntrada() {
		viewModel.dsVendForaFila.cancelChanges();
		app.navigate("#dentroFila-view");                 
	}
 
	function adicionarColaborador() {
		var novoColaborador = viewModel.dsColaborador.add();
		viewModel.set("colaboradorSelecionado", novoColaborador);
		viewModel.colaboradorSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));
		app.navigate("#editorColaborador-view");
	}
       
	function detalhesColaborador(e) {
		var colaborador = viewModel.dsColaborador.getByUid(e.touch.target.context.id);
		viewModel.set("colaboradorSelecionado", colaborador);
		dsTelColaborador.options.transport.read.url = baseUrl + "/RmTelColaborador/" + viewModel.colaboradorSelecionado.get("ColId");
		dsTelColaborador.read(); 
		app.navigate("#detalhesColaborador-view");
	}
     
	function adicionarLoja() {
		var loja = viewModel.dsLoja.add();		
		viewModel.set("lojaSelecionada", loja);
		app.navigate("#EditorLoja-view");
	}
    
	function salvarEdicaoLoja() {
		viewModel.dsLoja.sync();
		app.navigate("#:back");      
	}
    
	function cancelarEdicaoLoja() {
		viewModel.dsLoja.cancelChanges();        
		app.navigate("#:back");
	}
 
	function vendedoresFila() {
		atualizaFilaNoSalao(dsVendFila, 1);
		/*
		var sltBtn = this.header.find(".select-group").data("kendoMobileButtonGroup");        
		if (sltBtn)
		sltBtn.select(0);
		*/
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
		//dsLoja.options.transport.read.url = baseUrl + "/RmLoja";
		//dsLoja.read(); 
		dsLoja.options.transport.read.url = baseUrl + "/RmLoja/" + viewModel.idLoja;
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
    
	//<!--Atendimento-->
	function onSwipe(e) {
		var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
		button.expand().duration(200).play();
	}
    
	function onTouchstart(e) {
		button = $(e.touch.target).find("[data-role=button]:visible");
		if (button[0]) {
			var schemaVendedores = viewModel.dsVendFila.getByUid(e.touch.target.context.id);
			viewModel.set("vendedorSelecionado", schemaVendedores);
			tiposMovtoSaida();
			app.navigate("#sairdaFila_View");
       
			//prevent `swipe`
			button.hide();
			this.events.cancel();
			e.event.stopPropagation();
		}
		else {
			button.hide();
		}
	}

	function onSwipeFora(e) {
		var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
		button.expand().duration(200).play();
	}

	function onTouchstartFora(e) {
		button = $(e.touch.target).find("[data-role=button]:visible");
		if (button[0]) {
			var schemaVendedores = viewModel.dsVendForaFila.getByUid(e.touch.target.context.id);
			viewModel.set("vendedorSelecionado", schemaVendedores);
			//Entrar na fila			
			app.navigate("#entrarNaFila_View");
       
			//prevent `swipe`
			button.hide();
			this.events.cancel();
			e.event.stopPropagation();
		}
		else {
			button.hide();
		}
	}
    
	function onTouchstartTelefone(e) {
		button = $(e.touch.target).find("[data-role=button]:visible");        
        
		if (button[0]) {
			var telefone = viewModel.dsTelColaborador.getByUid(e.touch.target.context.id);			    
			dsTelColaborador.remove(telefone);
			
			//prevent `swipe`
			button.hide();
			this.events.cancel();
			e.event.stopPropagation();
		}
		else {
			button.hide();
		}
	}
    
	function atendimentoViewInit(e) {
		var schemaVendedores = viewModel.dsVendFila.getByUid(e.touch.target.context.id);
		viewModel.set("vendedorSelecionado", schemaVendedores);
		viewModelNaoVenda.set("vendedorSelecionado", schemaVendedores);
		adicionarAtendimento();
		app.navigate("#resultadoAtendimento-view");
	}

	function editorColViewInit(e) {
		var view = e.view;
        
		validatorColaborador = $("#editorColaborador").kendoValidator().data("kendoValidator");
		validatorTelColaborador = $("#editorTelColaborador").kendoValidator().data("kendoValidator");
 
		$('#novoTelefone').click(function() {
			viewModel.dsTelColaborador.add(
				{
				ColId: viewModel.colaboradorSelecionado.get("ColId"), 
				TteId: null, 
				TteDescricao: null,  
				TelNumero: null, 
				OpeId: null, 
				OpeDescricao: null, 
				TceId: null, 
				TceDescricao: null  
			});  
			return false;
		});
      
		$("#sexoId").find("option[value='" + viewModel.colaboradorSelecionado.get("ColSexo") + "']").attr("selected", true);
		$("#cargoId").find("option[value=" + viewModel.colaboradorSelecionado.get("CarId") + "]").attr("selected", true);
		$("#turnoId").find("option[value=" + viewModel.colaboradorSelecionado.get("ColHfuId") + "]").attr("selected", true);
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsColaborador.one("change", function() {
                dsTelColaborador.sync();
				view.loader.hide();
				app.navigate("#colaboradores-view");                
			});
            
			view.loader.show();
            if(viewModel.colaboradorSelecionado.get("ColFoto") == null) {
                viewModel.colaboradorSelecionado.set("ColFoto","data:image/png;base64,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");
            }
			viewModel.colaboradorSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));
            dsColaborador.sync();
		});
        
		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			dsColaborador.one("change", function() {
				view.loader.hide();
				app.navigate("#colaboradores-view");
			});

			view.loader.show();			
			dsColaborador.cancelChanges();
			dsTelColaborador.cancelChanges();
		});
	}
    
	function editorLojaViewInit(e) {
		var view = e.view;
        
		validatorLoja = $("#editorLoja").kendoValidator().data("kendoValidator");
		
		$('#novoTurno').click(function() {
			viewModel.dsEscala.add(
				{
				EscId: 0,           
				HfuId: 0,           
				LojId: viewModel.lojaSelecionada.get("LojId"),           
				TufId: 0,           
				TufDescricao:null,    
				DsfId: 0,  
				DsfDescricao: null ,   
				EscHrInicial: null,    
				EscHrFinal: null
			});
            
			return false;
		});
        
		var ufSel = viewModel.lojaSelecionada.get("LojUf");
		var lojaDe = viewModel.lojaSelecionada.get("LojShopping_rua");
		$("#LojUf").find("option[value='" + ufSel + "']").attr("selected", true)
		$("#LojShopping_rua").find("option[value=" + lojaDe + "]").attr("selected", true)
        
		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsLoja.one("change", function() {				
				view.loader.hide();
                dsEscala.sync(); 
				app.navigate("#detalhesLoja-view");
			});        
			
            view.loader.show();
            dsLoja.sync();
            
		});
        
		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			dsLoja.one("change", function() {
				view.loader.hide();
				app.navigate("#detalhesLoja-view");
			});

			view.loader.show();
			viewModel.set("lojaSelecionada", dsLoja.view()[0]);
			dsLoja.cancelChanges();
            dsEscala.cancelChanges
		});
	}
   
	function initValidacao() {
		document.getElementById("btnPesquisaCnpj").addEventListener("click", function() {	
			app.showLoading();
			validacaoDispositivo();			
		});
	}
    
	function validacaoDispositivo() {
		var iptCnpjInicial = document.getElementById("iptCnpjInicial");		  
		viewModel.idLoja = iptCnpjInicial.value;   
		dsLoja.options.transport.read.url = baseUrl + "/RmLoja/" + iptCnpjInicial.value;
		dsLoja.read(); 		
	}

	function formatField(strField, sMask) {
		var i, nCount, sValue, fldLen, mskLen,bolMask, sCod;
        
		sValue = strField;
		// Limpa todos os caracteres de formatação que
		// já estiverem no campo.
		// toString().replace [transforma em string e troca elementos por ""]
		sValue = sValue.toString().replace("-", "");
		sValue = sValue.toString().replace("-", "");
		sValue = sValue.toString().replace(".", "");
		sValue = sValue.toString().replace(".", "");
		sValue = sValue.toString().replace("/", "");
		sValue = sValue.toString().replace("/", "");
		sValue = sValue.toString().replace("/", "");
		sValue = sValue.toString().replace("(", "");
		sValue = sValue.toString().replace("(", "");
		sValue = sValue.toString().replace(")", "");
		sValue = sValue.toString().replace(")", "");
		sValue = sValue.toString().replace(" ", "");
		sValue = sValue.toString().replace(" ", "");
		sValue = sValue.toString().replace(":", "");
		fldLen = sValue.length;
		mskLen = sMask.length;
        
		i = 0;
		nCount = 0;
		sCod = "";
		mskLen = fldLen;
        
		while (i <= mskLen) {
			bolMask = ((sMask.charAt(i) == "-") || (sMask.charAt(i) == ":") || (sMask.charAt(i) == ".") || (sMask.charAt(i) == "/"))
			bolMask = bolMask || ((sMask.charAt(i) == "(") || (sMask.charAt(i) == ")") || (sMask.charAt(i) == " ") || (sMask.charAt(i) == "."))
        
			//Se for true utiliza elementos especiais aumenta a máscara
			if (bolMask) {
				sCod += sMask.charAt(i);
				mskLen++;
				//Caso false mostra o sValue(o q foi digitado)
			}
			else {
				sCod += sValue.charAt(nCount);
				nCount++;
			}
			i++;
		}
        
		return sCod;
	}
    
	function validarCPF(cpf) {
		cpf = cpf.replace(/[^\d]+/g, '');
     
		if (cpf == '')
			return false;
     
		// Elimina CPFs invalidos conhecidos
		if (cpf.length != 11 || 
			cpf == "00000000000" || 
			cpf == "11111111111" || 
			cpf == "22222222222" || 
			cpf == "33333333333" || 
			cpf == "44444444444" || 
			cpf == "55555555555" || 
			cpf == "66666666666" || 
			cpf == "77777777777" || 
			cpf == "88888888888" || 
			cpf == "99999999999")
			return false;
         
		// Valida 1o digito
		add = 0;
		for (i=0; i < 9; i ++)
			add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(9)))
			return false;
         
		// Valida 2o digito
		add = 0;
		for (i = 0; i < 10; i ++)
			add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(10)))
			return false;
		return true;
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
		atendimentoViewInit: atendimentoViewInit,
		adicionarColaborador: adicionarColaborador,
		viewModel: viewModel,
		initValidacao: initValidacao,
		formatField:formatField,
		onSwipe:onSwipe,
		onSwipeFora:onSwipeFora,
		editorColViewInit:editorColViewInit,
		onTouchstart:onTouchstart,
		onTouchstartFora:onTouchstartFora,
		onTouchstartTelefone:onTouchstartTelefone,
		validarCPF:validarCPF,				
		editorLojaViewInit: editorLojaViewInit
        
	});
})(jQuery);