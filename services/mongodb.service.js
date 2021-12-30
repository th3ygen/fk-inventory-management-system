const mongoose = require('mongoose');

// local mongodb url
const url = "mongodb://localhost:27017/papos";

// async function for mongodb connection
const connect = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
};

module.exports = { connect };