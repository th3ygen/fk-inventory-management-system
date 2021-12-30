const mqtt = require('./services/mqtt.service.js.js');

const Device = require('../models/Device.js');
const Data = require('../models/Data.js');

mqtt.on('message', async (topic, message) => {
    const dir = topic.split('/');

    try {
        if (dir[0] === 'device' && dir[2] === 'data') {
            const deviceId = dir[1];
            const data = JSON.parse(message);
    
            let device = await Device.find({ data.name });

            if (!device) {
                device = await Device.create({
                    name: data.name,
                    description: data.description,
                });
            }

            await Data.create({
                device_id: device._id,
                values: {
                    tds: data.tds,
                    oxy: data.oxy,
                    ph: data.ph,
                    temp: data.temp,
                },
                timestamp: Date.now(),
            });

            // notify the frontend to request for device updates
            mqtt.publish('server/state', "UPDATE");
        }

    } catch(e) {
        console.log(e);
    }
});