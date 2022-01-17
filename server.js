const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

const app = express();

app.use(cors());
app.use(bodyParse.json());

(async () => {
    try {
        // connect to the mongodb
        await require('./services/mongodb.service').connect("mongodb://localhost:27017/fk-ims");
        console.log('Connected to mongodb');

        // load models
        await require('./models/Item');
        await require('./models/Account');
        await require('./models/Vendors');
        await require('./models/Order');

        console.log('Loaded models');

        app.get('/test', (req, res) => {
            res.send('Hello World');
        });
    
        app.use('/api', require('./routers'));
        
        app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    } catch(e) {
        console.log(pe.render(e));
    }

})();
