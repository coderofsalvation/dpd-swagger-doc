var swagger = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "My Api",
    "description": "a wonderful api",
    "termsOfService": "http://mysite.org/terms/",
    "contact": {
      "name": "me@mysite.org"
    },
    "license": { "name": "Restricted" }
  },
  "transport": "http://",
  "host": "localhost:1881",
  "basePath": "/",
  "schemes": [ "http" ],
  "consumes": [ "application/json" ],
  "produces": [ "application/json" ],
  "paths": {}
}
var swagtool = require('dpd-swagger-doc')
swagtool.initResources(swagger, ctx.dpd )
ctx.done(false,swagger)
