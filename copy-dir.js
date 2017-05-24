var path = require('path');
mkdir('-p', 'resources/swagger-test');
cp('-Rf', path.join(__dirname, '/resource/*'), 'resources/swagger-test');