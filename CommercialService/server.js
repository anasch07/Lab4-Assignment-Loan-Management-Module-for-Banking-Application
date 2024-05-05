const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const app = express();
const PORT =  4004;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Function to get top 10 industries by count


// Function to get top 10 industries by count
app.get('/', (req, res) => {
    console.log('Request received for database service');
    res.send({message: 'Request received'});
});


// Routes
app.post('/commercialService', async (req, res) => {

    console.log('getting info from transactional database');



    const ocrResponse = await post('http://localhost:4008/ocr', {
        title: 'media title',
        description: 'media description',
        url: 'media url'
    })
    console.log(ocrResponse.data)


    const databaseResponse = await get('http://localhost:4004/database', {
        database: 'data',
    })
    console.log(databaseResponse.data)


    // send notification message to the notification service
    await post('http://localhost:4000/notify', {
        message: 'Job completed ! From Commercial service!'
    });

    res.send({message: 'sending data for risk management'});
});