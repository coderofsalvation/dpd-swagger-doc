var path = require('path'),
        fs = require('fs-extra');
console.log(__dirname);
fs.mkdir('resources/swagger-test');
fs.copy('-Rf', path.join(__dirname, '/resource/*'), 'resources/swagger-test');