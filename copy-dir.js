var path = require('path');
mkdir('-p', 'resources/swagger');
cp('-Rf', path.join(__dirname, '/resource/*'), 'resources/swagger');