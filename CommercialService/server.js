const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.CommercialService;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/', (req, res) => {
    console.log('Request received for database service');
    res.send({message: 'Request received'});
});


// Routes
app.post('/commercialService', async (req, res) => {

    console.log('--------------------------------------------');



    console.log('getting info from transactional database');



     await get(`http://localhost:${ports.OcrService}/ocr`, {
        title: 'media title',
        description: 'media description',
        url: 'media url'
    })
    console.log('OCR Done');


    await get(`http://localhost:${ports.DatabaseService}/database`, {
        database: 'data',
    })
    console.log('Fetched from Database Service');




    await post(`http://localhost:${ports.NotificationService}/notify`, {
        message: 'Job completed ! From Commercial service! With Data {...}'
    });

    console.log('Sending to Risk Management Service')
    await get(`http://localhost:${ports.RiskManagementService}/riskManagement`, {
        database: 'data',
    })
    console.log('Risk Management Done');




    res.send({message: 'Commercial Service done'});

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});