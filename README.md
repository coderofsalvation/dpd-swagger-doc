generate beautiful online swagger docs based on your deployd resources

<img src="screenshot.png"/>

## Usage

    $ cd your-deployd-dir
    $ npm install dpd-event dpd-swagger-doc

Then symlinks the swagger-html and copy the swagger-resource:

    $ cp -R node_modules/dpd-swagger-doc/resource resources/swagger
    $ cd public && ln -s ../node_modules/dpd-swagger-doc/node_modules/swagger-ui/dist apidoc && cd -

> Done! Now edit `resource/swagger/get.js` to configure the generated docs, and surf to `http://localhost/apidoc/?url=/swagger#!/default` to see the generated docs 

## Features

* swagger json (should be) automatically generated at endpoint `/swagger`
* automatic documentation for Collection resources 
* automatic documentation for UserCollection resources 
* Custom/Collection/UserCollection-resources can be hinted in config.json

## Hinting documentation 

Swagger will peek into your config.json for swagger snippets.
This will allow you to extend the documentation for (User)Collections, and
 define them from scratch for Custom resources:

    {
      "type": "Collection",                
      "properties": {
        "createdBy": {
            "name": "createdBy",
            "type": "string",
            "typeLabel": "string",
            "required": false,
            "id": "createdBy",
            "default":"username",                     <--  add this to automatically have generated mock payloads
            "order": 0
        },

        ....

      }
      "swagger":{                                     <--
        "methods":{                                   <--
          "get": {                                    <-- this is where the swagger extending 
            "public":true,                            <-- starts.. 
            "description": "Creates a item",          <--
            "produces": [ "application/json" ]        <-- for more see swagger 2 specs or just
          }                                           <-- peek here: http://petstore.swagger.io/v2/swagger.json
        }                                             <--
      }
    }

> NOTE: it is not need to specify get/post/put/delete sections, since they are automatically generated for 
>	UserCollections & Collections. However, as shown above you can overload them (just peek at the `/swagger`-output in your browser) 
