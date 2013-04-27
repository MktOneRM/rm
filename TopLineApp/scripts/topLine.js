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