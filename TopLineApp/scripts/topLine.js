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
                viewModel.colaboradorSelecionado.set("ColFoto","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA8CAYAAAA9vgdnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH3QQbBDgnpXByQwAAGjpJREFUaN7dm3mUVdWd7z977zPce2uugioKqqiCKgoBi0mNA4kaaSU4BAdsxQxqp9MxsZPuvOQl/d5LTLpXujt5neQ9V/frtCudqG0SNUERRO0YQEw0EkAQRQGZCijmmutOZ9h7vz9u1WUeJeut9fZaZ1FUnXP2Pr/9G76/7++3hbXWctR44403WL58OVu3biWRSJBIJHAcB2MMF2IIIU75t+OWcsHm01oThiHZbJaJEycye/ZsLr/88hPvPVoYq1atwnXd4gsAHMdBSnlBF3iqjz6doD7IMMYQxzFCCKy1xfk/9KEPHXOfc/R/li9fzty5c5k5cyb/P481a9awbNmy0wtj69at3HDDDUVpnqtGxFGMUAIhBSCwFoTWYAxGa0QcI2KNMKawQxgEhXsBLCCkBCURShE7DkophFIYITEWlAApzl8jhRAIIdi8efMJfz9GGL7vF1X1vEzDURBbQIIEISDX00X8/jbEps3YjZuw72/FHDyEzQe42qKtwViLEIDy0dUVyMZReG3jUTPaEeMmIJvHYyorsOLC+CshBIlE4vTCSCQSH8g/SCGQrkD3Hib4z+VEr63FDHQhshlsVz+6f4A4PYjNZFBBgNYx1lgsFiElwvFQA93YrgOEO3ci164nX1mOSKRwa+oQd9yEc/kVID6YD5NSkkwmTy8Mx3HOzYlZ0FDcsXjz+4jDezHr1xMuXUa4+m2kyaM8B2ElGIOyEnwPUVWJKE2gXBdjLToIYSCLzGYwmQzx4W7YuZtYGghC8MsQg72wfTvu5CnIhibkyJriQgrGJs5aGI7jnF4YxphzEoa1EFlDbA32wD6CJ55AvPwyomM3VjjIqgTCprBSYB2JjDVu7CAqKtDj6hENo3DKSjHaoHv6sR2d2EOHIZtBWIvyHGQcY5IGY0AsfJ7Mi0uRM2aQuO0u5E03IEdUIwUoa1FCfaCI5nyQ0GYlOFGIWfwCwQ/+FXoO4OZDTKqCvBT4A93IqpGIpibE5Daca67BTJ+KGjmClLUYJTFCgoWkNaAN0kREe3aTW7Ua++ofiLduwR46hMqH2JIknnVhzWaCTd/BrFxG4ktfIDHzUtQFiDLOuT4QxzHGUQgE+tAh4sd/jn5uCXbXTqRyIMhhowhRV4f80oO4U2fg1I1CVpYhRo9GVVYU36WGruOHWzMSt3Es4WVX4KXTmI5d6FdfI3rhRUzQB24CM+DAujXE3/g7ojvmIz7z6SMRw1ocwTn7lnMWhnUcdBCgd+3CvPQi0VNPw/vbUJXlkM8jWsfjtI5Dtk3E+9QnkM3Nx3x0R0cHuWyWUfX1pFKpAtL1fVpaW1mxYgX5fJ7KqmpGNTbQfMkMPCC+6grCceMQZeWYHZvRnftgXw+ybxC947fkM1nMiAqca65FllcgGXLKf2zNkIDdvYfoyaexjz+GCUOoq0UZASUJnDtuw1lwN4wZjbIQ6wAjQEkfgBUrVrBlyxZmzZrFlVdeya9+9Ss8z+O+++7j4YcfRmvNmDFjaGlp4cEHH6S0tBRcF3n1LLyrZxG//gbhL3+JXfoSItKYuhriHZux3/gW4nv/gHvVh1GV5VjOPX04Oz2yBms1Fgj27SO/+Dns44/i5gDroHWIaW3Cf+pp+MvPo+tGIoxBWIsULlK4xVel02leeOEFHnroIQYHB4miiJdeeokf/vCHzJkzh0ceeYQ5c+awaNEiDh06VDAna3GtxhIhZl2O85Wv4P63v8GMKMPJGRKkULmA4GvfIPjdq8SAQWKHkZy9gMKwSIyGfJhF//wpxJPPYKKY0FVoT6KDPHFXD/gCN5HEcdzCCgQoIZFH2W4+n6epqYlZs2bx3e9+l9WrVzM4OMiWLVuYNm0aDQ0NVFVVobXm4MGD5HI5hACFRKFwkKjGMchbbiL5nb9DtE0k7u7FGI3u7SL+/o8wjz5d+DALMRYtLqRmCNAG8s89h168BLl9JyJRSqRD0BplBaJ3AP3EL7BvvoWMLFKqIejLMbabTqcZO3Yst956K9u3b6ejo4OamhqmTJnC66+/zsqVK3n33XdJJBKkUimUUlgLCIFEIkyMFBa3biT+jTfj3HsP9vKZmDCCZAKzei3xwkWEGzehDVghzlo1zlIzQO/fR/zDfybevhUqynCNwKkfhVdWhZ8qxxEW/aNHCRY+RbTjvaIAjtfSRCJBTU0Nra2t3HnnnbS1tXHJJZewYMECFi1axCOPPMLGjRtpampi/PjxeJ53XDhXSAue0QjAv//T+F95ECoqkVpia0oIOreR+dG/E/X3IABpP6AD1dpgpUAKQbxpM9GPf4zsHQCnBB3EyMoUJY8+inz1d0S/eJJg53ZMVQnmp7/EdPaiv/1V3JYJxFhkrPGHEN8nP/lJ4jimrq6OBQsWMHv2bHzfZ/To0SxcuJBdu3bh+z4TJ04sOM/j8I9CMKxucihmuDMvhQc+S/D9h4lDgTzQg/rNy8Rzr0N8eBaysvKsIotzokUUHjPSIGKQroM9uJdw+cs4eY3N55Gt4/DuugM5cQKmYQzC8/B+8ijRnj1EcRbz+1cR3wyw3/gacsIEpHvEgY4dO/aY+SoqjuCOhoYGqqurMcYUBXEmFKmEQNaPRt70MezqNWTfeQfT1YXKpbFPL8Q2NGKmV56VCTinzvBAOk7BPFavxe4/DH45RkfItvG4fzofoySiqhw172bcMMRf+muyne8THzyA/vUy7Jh6uHs+6pIZRYvs7ulm/779dHd3E4YhQRCgtcbzPMrLy7nooouoqak5S1cmYIhqEM3NuHfdjtvTRXRgP3EqhfvaG4h58xDTpxY2+Ax+wTnRP9ihiRRCQH7xUsJFL6LcEqyNiEfXIqdMgdGjcbAQa6gbgf3Cn5NTDsGTPZjeXqRfCj9+DCstGd/BNDaz79AB3njt97z+2mu89957HDx4kEwmg9aaVCpFa2sr3/rWt7jmmmvOWhhWDvkkIRAfux7/hZdh1TpCYxEDA7gb3oZLpmHGjUPb03MhzuncptaaaN07RJu2QkUJyXQ/zhf/AufTn0QMB3EpkEA2DPmpzeBqy6WRy3Rf0leTIPHks2xc8RqPjinn+dXr6e3rJwqCYzhVx3EYGBigs7OTBx544BwIiiNmbYVAOAn4yCyc7TuQb72NLkuQXrKYqLKM0q98+Yz5izyZeQCYwBDv3YfJ9iBkgFIKUzUKZ9IU1KhRGB2hzZEH+np7+enPfs533lrLY0E/28I8pSaJiCIa9+3l429tQe4/QGVlBfd+5jMsWbKYl3/9MjfddBNax0RRhLW2CLTOi+sEnDlzcObOwRBhlIfZc4D4/e3EYUio7XnC8VgTb96CyaQRnocjHZjQhhxZhwMYURBEAQNANpMh393HvmyGZ5wcSQH3JEfQmPQYJS0fDTR/VVbFhvrRjBs7ltYJk0gm3SEHegQLrFy5klQqRW1tLcYYlFJFwmmYh3AcB9/3qaqqoqmpqcBaWYuNY2RNFWLKZGxlJVIrhNaogQHMwYNQO4ZCBne2PmNIeEpozLoNmEMDCO0UvMgl7Ti1I5CAVG7Ro3d1dbF9+3bap7bT09vDwcOHeTg9QA7JvW4Znu8QeYKvVY7i8YEszz/7HK8ufw3ha7Zs3lJkraWULFq0iKVLl+L7hVwmmUzieR5CCHzfL15VVVVMmjSJ++67r0BgW4saEppNplDNrYgdO7CuQEUBau8+5Mg6wDuPaBJFmA0bcLoPQRxijMa57loYM+YEXnHt2rV8+ctfZvfu3eRyOaSQSCv5t0w/pdbhz0orGJtQdLkhd0aCqu5evjfQzUBpBRaF57rkg6C4+3EcE8cxiUQCrTX5fB5jDFprDh06RC6XA+CVV17BWovrurS3t+MM7aStrkRMmQAdO7FWYPrTmG0dML393IRRBDjaIHfuwfalMThYP4UzYQLyJETqwMDAMWyzEBBbjYkNj2d6GYxD/jxVQlNK4Iok0/MBX0XQdfMtuK1tZLJZ3npzNT997DHiOEYpVUSrjY2NOI5DX18fI0aMoLOzk0wmQxzHALz44ou0trbS3t6OHFq7GlWPc+mV6OdeINYamU7j7dyO0ubsfcbRVJjWMfT2YXMBlJYhRtUhy8tPiuSCoV0tOjJ7BIQf1CEvOikmjW2gsdTHdA9Qkwu4QfmEYUBnaYpgajtTp7bTOzDA8mXL6OvrK3KU1tqiVgwLQClV/HnHjh1s3LjxmPlVTRXu1KmEtkBlks0Qd+7BPxdhHI1AoziPDvNYrRFV5cjWRk7FCg4MDJzezTeMZv/HP0Y3An/Fq5iePrRQpH72JFt/9yo9H5vL9I/fwTe/+U3CMOT5JUswxpBOp9mxYwfWWqIo4tChQ0RRRBRFRQ221pJOp4+PuKgxdcS+X6jB5HPo7l6sseeYqA1/cC6HNAZhQZSXohrrEerESH348GEOHz582jpFS90o5l0/l82XzeDFkhRb8hkqhSbvlXHj3l7GPbmQJ/7x73H9BHd/6lNcf8MNGGMIgoBMJkMulyvWSsMwLGrw8L9a6xNqwQKLX1GB4/nIMEZl82es5coTodaQ3WkNSKw1CKVwSkoLofS4+wcHBxkcHDxBCMMRIplM0n7xxdTX17HkhZf43rsbeDTIsyUSuE4M0tDSO8C8d7ewb9XvaB83iWuv+pOjzLVgHsYYzHAlbugaFrbWulgbHs6UDQKRSmJdhcFyNsSXc1p6TwyxidZihuR2vKXkcrmidz/ZqK+vp6m5GSssr/36Zbbu3sMh16dkcIAFpS5j3QSj/AT1mRzrliyldswE6mpHFLzweVblxdGZtzVIe3Z0l8PpMrWhXTZRTDSYwT+JzQ3b8KkccTKVJJHwCYOQviHfsk9HPNx/AK1HcG+FT7nrkItDpvx+PWrqcsIwj+sniII8WMuZ6Bkp5QllDmktJp1DBDHS8U+q1WcWxtCHmGQJhcclqj+Nv6ODnNYkjntoGBGeavT19tHX14/v+4xtbKSnpxutDUYp/iXTgxJwf2k5432HvCMp+/kSGnNZmpVkm5I4WJSF/EkiwbDQhRDHrMEC2sSobBpijfB9REkJsRC458Z0FSZQXoLY99C+Q5wZIOjowD9JnaOkpISSkpKTOk8hBHv37mXz5k3Eccz8+fMZM6ahMMuQnT820MsPDx9kQ1cP5GIymV6m6TzfK61mku+BEOTPYC7qOMcurEF2dqJ1AEYjEj52VDVKybN3oEermlAOsroKUkl0Pkd0+BD0953gM6qqqqiqqjql+gK8t2kT77zzNnPnzuXWefNoaGgoVPyBwaoKDsyYysCc6/EmTcaMKKc2qbgpkeKzqQravUQRTEkpThrej94MDcTdPZi33yn4TCEglcQ2ji7C9XM2E60kfnMT9Pahs1lUkCO3+T3EiBqc1JHJKysrqa6uPqkKD4e7XR0dLHzmGb7+9a9z1913U11Tw7Jly+jp6WHalIu59qa5VLVfTMezz1O5oodEbz/Sgb9MVSCEILCWd/M5lCPRsTnGJ1VUVFBXV1dceyQE8cHDsGY9SAfrONjyMpzmZjhDLfbUHKjrwsxpOLt2o7q6wfHRv16JaRoPE9tOSd2dzKYPd3WxeMkSsrkc8+bN4/bbb+fee+/FcRyCfJ7+vn42bnyPv3/uaW45OMj9fhkTrKDPCfhsqoJ6XP6GA+wJJMZEQ/tfGC0tLbS0tBQS7SEa0HT1kNu8BWVFgY2rrMAZ34Jx1Wk5DefkHgNcRxFPm0r8+utEOwQWgVq/BtEz74SX+L6P4zhFiHyykc1meeWVV+jo6KCxsZHKykqSiQT9/f30dvdwuKub7bv28DNjCWzIA5TSIlN4SnBNMsE/iVoeMt28Z8wxoWXa1KlMnz79GE7Dhlnktp1oKZBhjPQS2IYxiDN0u5w6a1UOavJEREkJNh9iSzSmowOzf/9RwMaiEFRWVjJt2jQ2bdpENps9Bduu6e3tpbe3l3Xr1p1yQQeBJ3I5jJfhnkQ1TaUOtb7LLalSOuOIxwWsPwrXTGm/mIsuuqiwZimhqwuz4R3sYD9uaTlWuVBegaytRXKOPmNYdpFUeA2jUaUVhTpqHBNl8gTr30ZMm4ZsaSmqZWNjI/Pnz2flypXs27ePgYGBY4RyNGo8/jr+HgFkrOVnQuB4mk/7CSpdRRDF/FWqBiEFxnPo9HzqGkYxpf1iUqlUITkUAvvsfxIvfokoJUnFmnBcE2LSRDzlnhGEOqeEb8YQK0V81eWYrdsQm7fgpUoInnwK40pKH3oIaSVmyG6/+MUv8rnPfa4Im48GZblcjnQ6zeDgIOl0mnw+X+zNDIKAfD5PEARF8GaNxVqBW57C37oH9823CLZuojtpWTBgmP/ROeiHvkqqqZXSsnKsNQWmKwjJrl9NtPk9nFSCdLqP1J2fI3HX/AJisieB0GfDdLlDNHLq1o8T9PWQf+dNrDcS1dcN2zYT796B2zC+UMyR6pR44/jejiiKionVcGo+fBWFaAtmGLqKEfkIZ9lv8X/8U/L7tpJIeVR27EH+5JfIrz6Irq4mRiCsJnpuMfn330Gg8VWS9AgIJk/AqR1ZoHTE+eYmw7G9ohwuu5SwoRnbN4DwPNi+i/gXT+M98AVsZQXaFFbvOmdwUGdAq6ckej8+FyebxVnyK6KOPYS7dmP3H0CmFP6nPok7+WLM1u1EzzyD09mJEGDCEO+m63HGt5x1n8ZZrUzUjsa78TaCZx/HGBexdS/mJ78guvxK5FWXYf0S0EN9nH+MLtaR1dgH/ww3KbFPLCRObyFKgfj3J7Al5egDXZj1G4jWrSeZyWOsIChxKP/E/XjNE4bSijOv7KwKz6K1GfX5e7EjG3CMwE16GBOR/tvvkF/3JhZQ1iCswWIwmLPuA4/juHhvHMfHpuJDv5eAMhL//vtRC25Hjh+LMxBgq0rJPP4LBr74ZfJPPgHGI5YOjGsmcfefIqdNQpck0PYCagaArB1F8itfQv/gnzHr1mHrqog7dhN+/9/w7k9TevONBUCjh9JlVdiJpUuXsnr1apLJJC0tLVx88cX09fWxceNGZs+ezYYNG9i5cyeVlZV4nseOHTuoqalh5syZLF++nP379/PhWR/mnk/cg0UQ334L1vPQTzwDe7cj+wchDSRccBTZdAavuYXqz9yPrCgf0glxAYWhC9/n3nIjZucubHYQu3cXwiuD376OtpawuhI5dQaqJHmMSq5du5bnn3+e5uZmrLXEccymTZv4wx/+QH19PUopent7WbVqFddffz179uxh48aN9PcXMt1du3ZRUV6O1nchhUDVjkJ9bA565170r7YhXYV0E4WIEgXIWVfi3HEbamzTkeAoLqhmFLpwkA7q/k9gfIX5p4dxNHhJBWtXEf3XA/A//jveZZfiVFUgnIIFep7HuHHjuPrqq2ltbaWzs5OdO3eSz+fp6+vj1ltvpbKyko6ODm6++WbGjBnDb37zG/r6+vj2t75NY0Mj3T09dHV1MXJEoWajsmm86iRZYqzRBXNSCjmygfKv/jXu7OuOYcIuaIObVAJvKNSKimrkjfNwQknw8P8mDDQylcLd10nwpQexd96JvedunPZ2HKCsopKrr76Gz3/+AbZt28bYsWOprq5mw4YNzJgxgyVLlvDWW28xefLkYuZ85VVXMW7ceP7nd/6BjVs385HZH6Wurg4Th4TPPk9+4UKiVatwjEL6HjbOY2sbkP/rH/FmXoZbLKD/EYRxNBgTgBo9CnHbzeQqXNx/+Q/Uxs3YujJEJo9dvozw/a1E4yZQdvet3DhnDrZ2ZIHcaW1Fak1dXR3Tp02jvr4ez3VpmzCB8ooKqqqqmDFzJiiH0opqAj/B1cLSGGjM04sZeGU50fbNiL17cTM5jJsgSGcQV11O8r98icTMy3ATiUJkU+KP3/ootAZHIcc24N19F05fjHl2McG+DkRk0Xv2YrftwL6+FifTz7jZ12HGNpJRglT9GETdSEpSdYWdBtrKy495fzKZhGyWcE8Hl2uNF8XYt95mcOEigjVrEY5FSYWIBTSORLVchXvHbfh/MrvAYmkw4vy403NHQFKCtUgEpYlS4r/+C4L28dgf/B/YuhUTC2xJChlDduFiMi+9hKwdiTd+IrlZH0J96FLU2LEIP4GVBTZMANJYtLWorsPEWzaRXbMGu24jg9u2Q18vCItTlip0EoYaXZbCmf1RUp/7DO74VqwFi8Gqgv7K80A8594Ue1T7nsWCtnhXz8ad0k74y6cIl76EeHcLXhASl/lYqzDdPeQGXyf15hri0JB3XKgux6urhbISImOJegdJHDhIkE9jrSEhXIywyDDEuEm0FYh0mqgshTP7I6Tu/QR25qWIIS6l4CvlBwJ9zgcBhgW62IKrsKNG4d52K87lV2De3UT46u8Il72MSqfB8zCOIR8OYiKLFQKV7iPbfRjhOoUPCCOigUzBDIUlFAIXRQjEQqLqRpK8dwF6xhTkxIm44yYQl6aGEjtT6Nz5gGfcnOM5h3M6QWhFoS1Ix1gpcRubkY3N6JkzsOPHY+vqkIcOI4IAlUljew5Dz2DB0UYBOp1BWIMSFPhJ30eUpBBlKSgtQZVX41ZWIMvLcJoa8e64HdtayDXkEDkth1L3c8p1hhLE0wojDMNzOrJZOIqmTiguOa5P6bXXoK+9hri3D7t7N2L3buymt9GbdhB3HiLODOIHwVDty4KQqEQZcX0NoqkBf3wLctJEEuOakKPHYDy/CM3F0Ys/D20YbnM4rTCy2exJJXY+7UQxBgcDFSWIyZPwLpqIve6jGK3x9VCVa7juMWRyoRAklERKiZYO2pXEUqKkKgrhQiWCJ6sCHiOMtra2E2oQ5zMk4BX6e/DlkXRQ+P4pM0MBHN35ofjjDSEEbW1tJ/7++EO+R/dQCSFOWro767ZEjhzStMcRafY0NdJjsWMhep3vaWghRPGQ73Cr1HCOdMUVV5xaGFA4/r1ixQq2bdtW7Ke6ENry/3IM+4h8Pk9bWxvXXXfdCYIA+L8vZEL6uGph9wAAAABJRU5ErkJggg==");
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