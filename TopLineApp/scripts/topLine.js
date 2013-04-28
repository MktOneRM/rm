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
				formatedValue = kendo.toString(value, "dd/MM/yyyy"); //format
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
			console.log("refresh= ", this, value);
			if (value) {
				formatedValue = kendo.toString(value, "yyyy/MM/dd"); //format
				$(that.element).val(formatedValue); //update the HTML input element
			}
		},
		change: function() {
			var formatedValue = this.element.value;
			value = kendo.parseDate(formatedValue, "yyyy/MM/dd");             
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
		editorColViewShow: editorColViewShow,
		onTouchstart:onTouchstart,
		onTouchstartFora:onTouchstartFora,
		onTouchstartTelefone:onTouchstartTelefone,
		editorLojaViewInit: editorLojaViewInit,
		editorLojaViewShow: editorLojaViewShow,
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
    
	function editorColViewShow() {
		$("#sexoId").find("option[value='" + viewModel.colaboradorSelecionado.get("ColSexo") + "']").attr("selected", true);
		$("#cargoId").find("option[value=" + viewModel.colaboradorSelecionado.get("CarId") + "]").attr("selected", true);
		$("#turnoId").find("option[value=" + viewModel.colaboradorSelecionado.get("ColHfuId") + "]").attr("selected", true);
	}

	function editorColViewInit(e) {
		var view = e.view;
		
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
        
		validatorColaborador = $("#editorColaborador").kendoValidator().data("kendoValidator");
		validatorTelColaborador = $("#editorTelColaborador").kendoValidator().data("kendoValidator");

		view.element.find("#btnCreate").data("kendoMobileButton").bind("click", function() {			
			dsColaborador.one("change", function() {
				dsTelColaborador.sync();
				view.loader.hide();
				document.location.href = "#colaboradores-view";                
			});
            
			if (viewModel.colaboradorSelecionado.get("ColFoto") == null) {
				viewModel.colaboradorSelecionado.set("ColFoto", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABbCAQAAABkbztKAAAAAXNSR0IArs4c6QAAAAJiS0dEAACqjSMyAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH2wQEFTgvaGyX4gAABD9JREFUaN7tmuty2zYQhb8FITmyFcmRa1uqk4k9bd//SfIGaTqdTHpz4tws60Zi+4MgQ9upBHBIuz9IzUgjiRAOds+eXSwkr5T/zWWgA9OB6cB0YDowHZgOTMNglDaSva0DRFAon6kAK97JQ4ERFONBORRwgCA4QDGIv0vaBwPgUARhzFMGDOj56TekLPnCnBWO5CHcBMKYCZPSUsXnFss+EzIy/uaybTCOhAUvmJbr1jvxoIDB8IIRb6KIbuLDb8U5UyzynQeePTmRRzyP4o2Jt8wFM29Q3epKEI75OcI2Jo4tG044xeF2Rov6x5BfyJoHowg9pjgEQ4oJWrNjxBGbNtw0xWIwCHarZQSD8a/KOb1mweQSN6gMkAB5LEK/F2TFSMsMcDUkUgLlL4ozSRm+j5y1pcw6dSzjgkaaGNwZUop/OBDKxNoggYub5fHd1F5JVRNMRhZk7gcAoygmkIp3s5QLKrUidaaeVULdG5mbtGZoa7OhLRF6cd8qrg3O1CVv1qxlUiw/BCa8+xP82CyYhJSX9Gu4CZQZg6Zzk6sVSXly3TSZDjIsn4OpeDujASya1BkDLGsEd2iSjEyUykcgiYSTc+aq6UrPskZr7KDBMA+q9SII7GpROHfsqtl6Jk927+60QEJGwQdugmQvMh1c8tWvVoNdZHgbuMsycQZX1iguovxUMrLAaaJLiHkJRAOXcBM8iYml46cy0CVwxHU7YATDDRs/LNRR79nggrY50W7q86sP823xoSgZDsdn1thAUYh2EyzZIDu0ON/yGeDPsu2oTYPJU+ZrryDbLJN/+4FrEjKSoBoxGowAH1ntZEwuBJdknuwtWcbRZ7kzmgyKssIgJO1sVYqYsjsGSvnjibeMNE/gYqIkcM+deLVuRfQKetpA0E/a22tXV6wBkGEQVRtGi56S0g/I2rlzBqQRcGw8X2ac7GwAqJe5CcLvwYc+kf0ZWDOjj5LsbDXnresj39hvwU0pCT0Es+MAR7y+KDAMdlTUXtsAY7+Rl62pT1EcDkUZsQmEY8MdBI6UcXnOlmxR1UKLQNnHeuDShGWKnpXjjMPyxCSMlMo+L9kPqg1teKfqORP2ojs0guOIZ3zlHYsdCwhwU8YBp4yxNdto+fQjDvnEHyy2OEy+/2+0b8fFQ844KKsXV6NLnpXlgwJL/uEL6S2g/2kZ9W35JXuccYxiKw3pxAONicHbSfWAc5Q5b1jeO/ipWKao+B0w4pQhhqzSq2qqM65+cde854pNBVIFjPPh9YwZT3wJbSp1W3NgiqLVkHLFXyxIMFU3KYaEE6a+YMwVtogdbfTEID9IS3AYjjlhzm95pOWWUQwXPK2UBlLqiTbqpNsBUvyuY83b3DLKmAvPebkTku2cotyXzD1+wsKQA85wPvc8zpWXJPaUI/YeFci3vGQPa/R227pEu/8Dd2A6MB2YDkwHhn8BXNB6BARw7GsAAAAASUVORK5CYII=");
			}
			viewModel.colaboradorSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));
			dsColaborador.sync();
			view.loader.show();
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
    
	function editorLojaViewShow() {
		var ufSel = viewModel.lojaSelecionada.get("LojUf");
		var lojaDe = viewModel.lojaSelecionada.get("LojShopping_rua");
		$("#LojUf").find("option[value='" + ufSel + "']").attr("selected", true)
		$("#LojShopping_rua").find("option[value=" + lojaDe + "]").attr("selected", true)
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
			dsEscala.cancelChanges();
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
		editorColViewShow: editorColViewShow,
		onTouchstart:onTouchstart,
		onTouchstartFora:onTouchstartFora,
		onTouchstartTelefone:onTouchstartTelefone,
		validarCPF:validarCPF,				
		editorLojaViewInit: editorLojaViewInit,
		editorLojaViewShow: editorLojaViewShow        
	});
})(jQuery);