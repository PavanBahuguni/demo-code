const { DB_URL, PORT } = require('./config');
const { controllers } = require('./controllers');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 

(async() => {
    // establish connection to mongo
    const mongoose = require('mongoose');
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true });
    } catch(err) {
        console.log('Error while connecting to mongo', err);
        throw new Error(err);
    }
    try {
        // start express server.
        if (await app.listen(PORT)) {
            console.log('Express server running on port: ', PORT);
            // register all the controllers.
            for(const controller of controllers) {
                controller(app);
            }
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log('Error while connecting to mongo', err);
        throw new Error(err);
    }
})();