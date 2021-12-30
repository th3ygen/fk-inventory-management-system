const express = require('express');

const mqtt = require('./services/mqtt.service.js');

const app = express();

(async () => {
    /* establish connections to DB and MQTT service */
    await require('./services/mongodb.service.js').connect();
    await require('./services/mqtt.service').connect();

    /* app.get('/test', (req, res) => {
        res.send('Hello World');
    }); */
    
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });

})();
