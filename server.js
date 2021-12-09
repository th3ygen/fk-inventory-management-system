const express = require('express');

const app = express();

(async () => {
    // connect to the mongodb
    await require('./service/mongodb.service').connect();

    app.get('/test', (req, res) => {
        res.send('Hello World');
    });
    
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });

})();
