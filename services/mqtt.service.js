const mqtt = require('mqtt');
// load broker url from env
const brokerUrl = process.env.MQTT_BROKER_URL;

// connect to broker
const client = mqtt.connect(brokerUrl);

const connect = () => (
    new Promise((resolve, reject) => {
        if (client.connected) {
            console.log('already connected to broker');
            client.subscribe('device/+/data');
            client.subscribe('test');
            return resolve(client);
        }

        client.on('connect', () => {
            console.log('connected to broker');
            
            client.subscribe('device/+/data');
            client.subscribe('test');
            
            return resolve(client);
        });
        
        client.on('error', reject);
}));

module.exports = { client, connect };