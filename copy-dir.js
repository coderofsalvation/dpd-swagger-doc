var path = require('path'),
        fs = require('fs');
fs.mkdir('-p', 'resources/swagger-test');
fs.cp('-Rf', path.join(__dirname, '/resource/*'), 'resources/swagger-test');