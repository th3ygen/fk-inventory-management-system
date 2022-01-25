const mqtt = require('../services/mqtt.service.js').client;

const Device = require('../models/Device.js');
const Data = require('../models/Data.js');

const parseData = (payload) => {
    let res = {};

    payload.toString().split('&').forEach(item => {
        const [key, value] = item.split('=');
        res[key] = value;
    });

    return res;
};

mqtt.on('message', async (topic, message) => {
    const dir = topic.split('/');

    try {
        if (dir[0] === 'device' && dir[2] === 'data') {
            const name = dir[1];
            const data = parseData(message);
    
            console.log(name, data);

            let device = await Device.findOne({ name });

            if (!device) {
                device = await Device.create({
                    name,
                    description: data.description,
                });

                mqtt.publish('server/state', "NEWDEVICE");
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
            mqtt.publish('server/state', "UPDATE:" + name);
        }

    } catch(e) {
        console.log("ERROR:", e.message);
    }
});