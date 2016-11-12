var jsdefault = require('json-schema-defaults')

var addGet = function(pathname,method,swagger,endpoint,resourceConfig){
	if( method == "get" && !endpoint.responses[200] ){
		endpoint.responses[200] = {
			type: "object", 
			properties: resourceConfig.properties
		}
		if( !swagger.paths["/"+pathname+"/:id"] ) swagger.paths["/"+pathname+"/:id"] = {}
		swagger.paths["/"+pathname+"/:id"]["get"] = endpoint
		var endpoint = JSON.parse(JSON.stringify(endpoint))
		endpoint.responses[200] = {
			type: "array", 
			items: [{
					type:"object",
					properties: resourceConfig.properties
			}]
		}
		if( !swagger.paths["/"+pathname] ) swagger.paths["/"+pathname] = {}
		swagger.paths["/"+pathname][method] = endpoint
	}
}

var addPost = function(pathname,method,swagger,endpoint,resourceConfig){
	if( method == "post" && !endpoint.parameters ){
		if( !swagger.paths["/"+pathname+"/:id"] ) swagger.paths["/"+pathname+"/:id"] = {}
		endpoint.parameters = [
			{
				"in": "body",
				"name": "body",
				"description": pathname+" object that needs to be added",
				"required": true,
				"schema": {
					type: "object",
          properties: resourceConfig.properties 
				}
			}
		]
		swagger.paths["/"+pathname][method] = endpoint
	}
}

var addPut = function(pathname,method,swagger,endpoint,resourceConfig){
	if( method == "put" && !endpoint.parameters ){
		if( !swagger.paths["/"+pathname+"/:id"] ) swagger.paths["/"+pathname+"/:id"] = {}
		endpoint.parameters = [
			{
				"in": "body",
				"name": "body",
				"description": pathname+" fields that needs to be updated",
				"required": true,
				"schema": {
					type: "object",
          properties: resourceConfig.properties 
				}
			}
		]
		swagger.paths["/"+pathname+"/:id"][method] = endpoint
	}
}

var addDelete = function(pathname,method,swagger,endpoint,resourceConfig){
	if( method == "delete" && !endpoint.parameters ){
		if( !swagger.paths["/"+pathname+"/:id"] ) swagger.paths["/"+pathname+"/:id"] = {}
		swagger.paths["/"+pathname+"/:id"][method] = endpoint
	}
}

module.exports = function(){
  this.initResources = function(swagger, dpd){
    for( var i in dpd ){
      if( i == "swagger" ) continue
      console.log("init resource: "+i)
      var resource = dpd[i]
      var resourceConfig = resource.getResource().config
      if( resourceConfig.swagger ){
        var sdef = resourceConfig.swagger
				if( resourceConfig.type == "Collection" ){
					var methods = ["get","post","put","delete"]
					methods.map( function(method){
						if( !sdef.methods[method]	) sdef.methods[method] = {}
					})
				}
        for( var method in sdef.methods ){
          var endpoint = sdef.methods[method]
          if( endpoint.public != undefined && !endpoint.public ) continue
          endpoint.responses = endpoint.responses || {}
					addGet(i,method,swagger,endpoint,resourceConfig)
					addPost(i,method,swagger,endpoint,resourceConfig)
					addDelete(i,method,swagger,endpoint,resourceConfig)
					addPut(i,method,swagger,endpoint,resourceConfig)
        }
      }
    }
  }
  return this
}

module.exports = new module.exports()
