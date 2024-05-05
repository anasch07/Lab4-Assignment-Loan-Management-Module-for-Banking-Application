const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.CreditService;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.get('/', (req, res) => {
    console.log('Request received for Risk Management Service');
    res.send({message: 'Request received'});
});


// Routes
app.get('/creditService', async (req, res) => {
    console.log('--------------------------------------------');

    console.log('doing credit service');
        await post(`http://localhost:${ports.MediaService}/media`, {
            title: 'media title',
            description: 'media description',
            url: 'media url'
        })
        console.log("Uploaded to media service");

      await post(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log("fetched from db");
     
        // send notification message to the notification service
        await post(`http://localhost:${ports.NotificationService}/notify`, {
        message: 'Job completed ! From Credit service!'
    });

        res.send({message: 'credit service done'});



    }
)




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
