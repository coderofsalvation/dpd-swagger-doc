module.exports = function(){

	var me = this

	this.addGet = function(resourcename,method,swagger,endpoint,resourceConfig){
		if( method == "get" ){
			if( !endpoint.responses[200] ){
				endpoint.responses[200] = {
					"schema":{
						type: "object", 
						properties: resourceConfig.properties
					}
				}
			}
			if( !endpoint.parameters ){
				endpoint.parameters =  [
					{
						"in": "path",
						"name": "id",
						"description": resourcename+" id (hash-string)",
						"required": true,
						"type": "string"
					}
				]
			}
			if( !swagger.paths["/"+resourcename+"/{id}"] ) swagger.paths["/"+resourcename+"/{id}"] = {}
			if( !endpoint.description ) endpoint.description = "retrieve a "+resourcename+" item with given id"
			swagger.paths["/"+resourcename+"/{id}"][method] = endpoint
			var endpoint2 = {
				responses: {
					200: {
						"schema":{
							type: "array", 
							items: [{
									type:"object",
									properties: resourceConfig.properties
							}]
						}
					}
				}
			}
			if( !swagger.paths["/"+resourcename] ) swagger.paths["/"+resourcename] = {}
			endpoint2.description = "retrieve array of "+resourcename+" items"
			swagger.paths["/"+resourcename][method] = endpoint2
		}
	}

	this.addPost = function(resourcename,method,swagger,endpoint,resourceConfig){
		if( method == "post" ){
			if( !swagger.paths["/"+resourcename+"/{id}"] ) swagger.paths["/"+resourcename+"/{id}"] = {}
			if( !endpoint.parameters ){
				endpoint.parameters = [
					{
						"in": "body",
						"name": "body",
						"description": resourcename+" object that needs to be added",
						"required": true,
						"schema": {
							type: "object",
							properties: resourceConfig.properties 
						}
					}
				]
			}
			if( !endpoint.description ) endpoint.description = "create a "+resourcename+" item"
			swagger.paths["/"+resourcename][method] = endpoint
		}
	}

	this.addPut = function(resourcename,method,swagger,endpoint,resourceConfig){
		if( method == "put" ){
			if( !swagger.paths["/"+resourcename+"/{id}"] ) swagger.paths["/"+resourcename+"/{id}"] = {}
			if( !endpoint.parameters ){
				endpoint.parameters = [
					{
						"in": "path",
						"name": "id",
						"description": resourcename+" id (hash-string)",
						"required": true,
						"type": "string"
					},
					{
						"in": "body",
						"name": "payload",
						"description": resourcename+" field(s) that needs to be updated",
						"required": true,
						"schema": {
							type: "object",
							properties: resourceConfig.properties 
						}
					}
				]
			}
			if( !endpoint.description ) endpoint.description = "update "+resourcename+" item-value(s) based on a given id"
			swagger.paths["/"+resourcename+"/{id}"][method] = endpoint
		}
	}

	this.addDelete = function(resourcename,method,swagger,endpoint,resourceConfig){
		if( method == "delete" && !endpoint.parameters ){
			if( !swagger.paths["/"+resourcename+"/{id}"] ) swagger.paths["/"+resourcename+"/{id}"] = {}
			swagger.paths["/"+resourcename+"/{id}"][method] = endpoint
			if( !endpoint.description ) endpoint.description = "deletes an "+resourcename+" item based on a given id"
			if( !endpoint.parameters ){
				endpoint.parameters = [
					{
						"in": "body",
						"name": "body",
						"description": resourcename+" object that needs to be added",
						"required": true,
						"schema": {
							type: "object",
							properties: resourceConfig.properties 
						}
					}
				]
			}
		}
	}

  this.addUserEndpoints = function (resourcename, swagger, resourceConfig ){
    swagger.paths["/"+resourcename+"/login"] = {
      "post":{
				"description":"log user in and receive user object with sessionid (or error)",
        "responses": {
          
        },
        "parameters": [
          {
            "in": "body",
            "name": "payload",
            "description": "object with credentials",
            "required": true,
						"schema":{
							"type": "object",
							"properties":{
								"username":{ 
									type:"string",
									default: "john",
									required:true
								},
								"password":{ 
									type:"string",
									default: "foobar",
									required:true
								}
							}
						}
          }
				]
      }
    }
    swagger.paths["/"+resourcename+"/logout"] = {
      "post":{
				"description":"log user out and end session",
        "responses": {
          
        },
        "parameters": []
      }
    }
    swagger.paths["/"+resourcename+"/me"] = {
      "get":{
				"description":"get current user",
        "responses": {
          
        },
        "parameters": []
      }
    }
  }

  this.initResources = function(swagger, dpd){
    for( var i in dpd ){
      if( i == "swagger" ) continue
      var resource = dpd[i]
      var resourceConfig = resource.getResource().config
      var sdef = resourceConfig.swagger ? resourceConfig.swagger : false 
			if( !sdef ){ // only auto-document Collections
				var types = ["Collection","UserCollection"]
				if( types.indexOf(resourceConfig.type) != -1){
					sdef = {methods:{}}
					var methods = ["get","post","put","delete"]
					methods.map( function(method){
						if( !sdef.methods[method]	) sdef.methods[method] = {}
					})
					for( var method in sdef.methods ){
						var endpoint = sdef.methods[method]
						if( endpoint.public != undefined && !endpoint.public ) continue
						endpoint.responses = endpoint.responses || {}
						me.addGet(i,method,swagger,endpoint,resourceConfig)
						me.addPost(i,method,swagger,endpoint,resourceConfig)
						me.addDelete(i,method,swagger,endpoint,resourceConfig)
						me.addPut(i,method,swagger,endpoint,resourceConfig)
					}
				}
				if( resourceConfig.type == "UserCollection" )
          me.addUserEndpoints(i, swagger, resourceConfig )
			}
    }
  }
  return this
}

module.exports = module.exports()
