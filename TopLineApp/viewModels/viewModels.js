(function($, console, doc) {
	var lojaViewModel,
	baseUrl = "http://localhost:50000/api";
	
	//View Model - Consulta e Cadastro de Lojas
	lojaViewModel = kendo.data.observable({
		dsLoja = dsLoja,        
		getLojas:
		function() {
			dsLoja.options.transport.read.url = baseUrl + "/RmLoja";
			dsLoja.read(); 
		},
		addNovaLoja:
		function() {
		}
	});
    
	//schema
	var scLoja = { 
		model: {
			id: "LojId",
			fields: {
				LojId: { editable: false, nullable: false },
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
				LojRua: { editable: false, nullable: false },
				LojShopping: { editable: false, nullable: false },                        
				LojFranquia: { editable: false, nullable: false },
				LojMultimarca: { editable: false, nullable: false },                        
				LojDtCadastro: { editable: false, nullable: false },
				LojLatitude: { editable: false, nullable: false },
				LojLongitude: { editable: false, nullable: false }
			}     
		}
	};

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
	});  
    
	$.extend(window, {
		lojaViewModel: new lojaViewModel()
		
	});
})(jQuery, console, document);;