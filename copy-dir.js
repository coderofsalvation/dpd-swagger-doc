var path = require('path'),
        fs = require('fs-extra');
//fs.mkdir('resources/swagger-test');
fs.copy(path.join(__dirname, '/resource/*'), 'resources/swagger-test');