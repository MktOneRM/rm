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
			if (value) {
				formatedValue = kendo.toString(value, "yyyy-MM-dd"); //format
				$(that.element).val(formatedValue); //update the HTML input element
			}
		},
		change: function() {
			var formatedValue = this.element.value;
			value = kendo.parseDate(formatedValue, "yyyy-MM-dd");             
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
    
	//Schema de tipos de movimentação Entrada ou Saída
	var schemaTiposMovto = { 
		model: {
			id: "TmoId",
			fields: {
				TmoId: { editable: false, nullable: false },
				TmoDescricao: { editable: false, nullable: false },
				TmoEntradaSaida: { editable: false, nullable: false }
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
				ColCpf: { type:"string", validation: { required: true}, editable: true, nullable: false},
				ColSexo: { validation: { required:true}, defaultvalue: "M"},
				ColApelido:  { validation: { required: true} },
				ColNome:  { validation: { required: true} },
				ColSobrenome:  { validation: { required: true} },
				ColDtnascimento: { type: "date", validation: { required: true} },  
				ColEmail: { validation: { required: false} },
				ColFoto: { type: "text", validation: { required: false}, defaultValue: null },
				ColFotoCorpo: { type: "text", validation: { required: false}, defaultValue: null },
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
			"ColApelido", dir: 
			"asc" 
		}	
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
				if (operation == "read")
					return {
						id: viewModel.lojaSelecionada.LojId
					}                
				else if (operation !== "read" && data.models) {
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
				if (operation == "read")
					return {
						id: viewModel.lojaSelecionada.LojId
					}  
				if (operation !== "read" && data.models) {
					return kendo.stringify([data.models[0]]);
				}
			}     
		},
		batch: true,
		sort: { field: "ColNome", dir: "asc" },
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
			field:"TteId", 
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
		adicionarColaborador: adicionarColaborador,
		detalhesColaborador: detalhesColaborador,				
		vendedoresFila : vendedoresFila,
		vendedoresForaFila : vendedoresForaFila,		
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
		validarCPF:validarCPF,	
        
		idLoja: null,        
		motivos: [],
		motivo: [],
        
		sairFilaViewInit: sairFilaViewInit,
		sairFilaViewShow: sairFilaViewShow,
		entrarFilaViewInit: entrarFilaViewInit,
		entrarFilaViewShow: entrarFilaViewShow
               
        
	});

	function adicionarAtendimento() {
		var novoAtendimento = viewModel.dsAtendimento.add();        
		viewModel.set("atendimento", novoAtendimento);     
        
		var RLoId = viewModel.vendedorSelecionado.get("RedeLojId");            
		var LcoId = viewModel.vendedorSelecionado.get("LojaColId");
		var LojId = viewModel.vendedorSelecionado.get("LojId");
            
		viewModel.atendimento.set("RLoId", RLoId);
		viewModel.atendimento.set("LcoId", LcoId);
		viewModel.atendimento.set("LojId", LojId);  
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
 
	function vendedoresFila() {        
		atualizaFilaNoSalao(dsVendFila, 1);		
	}
			
	function vendedoresForaFila() {
		atualizaFilaNoSalao(dsVendForaFila, 2);
	}
	    
	function tiposMovto(e) {
		var vendedor = viewModel.dsVendFila.get(e.context);
		viewModel.set("vendedorSelecionado", vendedor); 	
	}
			
	function tiposMovtoEntrada() {
	}
	
	function tiposMovtoSaida() {		
		dsTiposMovto.options.transport.read.url = baseUrl + "/RmTipoMovimento/false";
		dsTiposMovto.read(); 
	}
    
	function lojas() {			
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
		//dsColaborador.options.transport.read.url = baseUrl + "/RmColaborador";
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
			//Saida
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

	function atendimentoViewTap(e) {
		var schemaVendedores = viewModel.dsVendFila.getByUid(e.touch.target.context.id);
		viewModel.set("vendedorSelecionado", schemaVendedores);
		viewModelNaoVenda.set("vendedorSelecionado", schemaVendedores);
		adicionarAtendimento();
		app.navigate("#resultadoAtendimento-view");
	}
	   
	function atendimentoViewInit(e) {
		var view = e.view;
		validatorAtendimento = $("#formAtendimento").kendoValidator({}).data("kendoValidator");
    
		view.element.find("#salvar").data("kendoMobileButton").bind("click", function() {	
			viewModel.dsAtendimento.one("change", function() {				
				view.loader.hide();
				app.navigate("#dentroFila-view"); 
			});
            
			view.loader.show();
            
			if (validatorAtendimento.validate()) {
				viewModel.dsAtendimento.sync(); 	                
			}
			else {
				view.loader.hide();		
				return;
			}
		});
        
		view.element.find("#cancelar").data("kendoMobileButton").bind("click", function(e) {
			e.preventDefault();
			viewModel.dsAtendimento.one("change", function() {
				view.loader.hide();
				app.navigate("#dentroFila-view");
			});

			view.loader.show();
			viewModel.dsAtendimento.cancelChanges();			
		});
	}

	function editorColViewShow() {
		var formatedValue = kendo.toString(new Date(), "yyyy-MM-dd"); //format
		
		viewModel.set("confirma", false);
		viewModel.colaboradorSelecionado.set("ColDtnascimento", formatedValue);
		viewModel.colaboradorSelecionado.set("ColDtentrada", formatedValue);
		        
		$("#sexoId").find("option[value='" + viewModel.colaboradorSelecionado.get("ColSexo") + "']").attr("selected", true);
		$("#cargoId").find("option[value=" + viewModel.colaboradorSelecionado.get("CarId") + "]").attr("selected", true);
		$("#turnoId").find("option[value=" + viewModel.colaboradorSelecionado.get("ColHfuId") + "]").attr("selected", true);
        
		//Adiciona o Id da Loja no cadastro do Colaborador
		viewModel.colaboradorSelecionado.set("LojId", viewModel.lojaSelecionada.get("LojId"));
        
		//Caso não tenha informado a foto, gravamos a foto de padrão tanto para close quanto para Corpo.
		if (viewModel.colaboradorSelecionado.get("ColFoto") == null) {
			viewModel.colaboradorSelecionado.set("ColFoto", "data:image/png;base64,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");
		}
		if (viewModel.colaboradorSelecionado.get("ColFotoCorpo") == null) {
			viewModel.colaboradorSelecionado.set("ColFotoCorpo", "data:image/png;base64,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");
		}
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
				app.navigate("#colaboradores-view"); 
			});
            
			view.loader.show();
			
			if (validatorColaborador.validate() && validatorTelColaborador.validate()) {				
				dsColaborador.sync();				
			}
			else {
				view.loader.hide();		
				return;
			}
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
		viewModel.set("confirma", false);
		var ufSel = viewModel.lojaSelecionada.get("LojUf");
		var lojaDe = viewModel.lojaSelecionada.get("LojShopping_rua");
		$("#LojUf").find("option[value='" + ufSel + "']").attr("selected", true)
		$("#LojShopping_rua").find("option[value=" + lojaDe + "]").attr("selected", true)
	}
    
	function editorLojaViewInit(e) {
		var view = e.view;
		
		validatorLoja = $("#editorLoja").kendoValidator().data("kendoValidator");
		validatorTurno = $("#editorTurnosLoja").kendoValidator().data("kendoValidator");		
        
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
			
			if (validatorLoja.validate() && validatorTurno.validate()) {
				dsLoja.sync();
			}
			else {
				view.loader.hide();		
				return;
			}
		});
        
		view.element.find("#btnCancel").data("kendoMobileBackButton").bind("click", function(e) {
			e.preventDefault();
			dsLoja.one("change", function() {
				dsEscala.cancelChanges();
				view.loader.hide();
				app.navigate("#detalhesLoja-view");
			});

			view.loader.show();
			viewModel.set("lojaSelecionada", dsLoja.view()[0]);
			dsLoja.cancelChanges();			
		});
	}
   
	/*Sair da Fila*/
	function sairFilaViewInit(e) {
		var view = e.view;
       
		view.element.find("#salvarMaior").data("kendoMobileButton").bind("click", function() {	
			viewModel.dsVendFila.one("change", function() {				
				view.loader.hide();
				app.navigate("#dentroFila-view") 
			});
            
			view.loader.show();
            viewModel.dsVendFila.sync();
            
		});
        
		view.element.find("#cancelarMaior").data("kendoMobileButton").bind("click", function(e) {
			e.preventDefault();
			viewModel.dsVendFila.one("change", function() {
				view.loader.hide();
				app.navigate("#dentroFila-view");
			});

			view.loader.show();
			viewModel.dsVendFila.cancelChanges();			
		});
	}
    
	function sairFilaViewShow() {
		var filter = {
			field: "TmoEntradaSaida",
			operator: "eq",
			value: false
		};
        
		viewModel.dsTiposMovto.filter(filter);
        
        viewModel.vendedorSelecionado.set("SaidaFila", true);
		viewModel.vendedorSelecionado.set("TmoId", parseInt(viewModel.motivos[0].TmoId));
		viewModel.dsVendFila.remove(viewModel.vendedorSelecionado); 
	}
    
	function entrarFilaViewInit(e) {
		var view = e.view;
        
		view.element.find("#salvarMaior").data("kendoMobileButton").bind("click", function() {	
			viewModel.dsVendFila.one("change", function() {				
				view.loader.hide();
				app.navigate("#dentroFila-view"); 
			});
            
			view.loader.show();
            viewModel.dsVendFila.sync();
			
		});
        
		view.element.find("#cancelarMaior").data("kendoMobileButton").bind("click", function(e) {
			e.preventDefault();
			viewModel.dsVendFila.one("change", function() {
				view.loader.hide();
				app.navigate("#dentroFila-view");
			});

			view.loader.show();
			viewModel.dsVendFila.cancelChanges();			
		});
	}
    
	function entrarFilaViewShow() {
		var filter = {
			field: "TmoEntradaSaida",
			operator: "eq",
			value: true
		};
        
		viewModel.dsTiposMovto.filter(filter);
        
		var LojId = viewModel.vendedorSelecionado.get("LojId");
		var LojaColId = viewModel.vendedorSelecionado.get("LojaColId");
        
		var entrada = viewModel.dsVendFila.add(); 		
        
		viewModel.set("vendedorSelecionado", entrada);        
		viewModel.vendedorSelecionado.set("LojId", LojId);
		viewModel.vendedorSelecionado.set("LojaColId", LojaColId);        
		viewModel.vendedorSelecionado.set("EntradaFila", 1);		
		viewModel.vendedorSelecionado.set("TmoId", parseInt(viewModel.motivos[0].TmoId));
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
		atendimentoViewTap: atendimentoViewTap,
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
		editorLojaViewShow: editorLojaViewShow,
		sairFilaViewInit: sairFilaViewInit,
		sairFilaViewShow: sairFilaViewShow,
		entrarFilaViewInit: entrarFilaViewInit,
		entrarFilaViewShow: entrarFilaViewShow
	});
})(jQuery);