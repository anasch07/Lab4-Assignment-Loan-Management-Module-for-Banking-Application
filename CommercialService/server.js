const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.CommercialService;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Function to get top 10 industries by count
app.get('/', (req, res) => {
    console.log('Request received for database service');
    res.send({message: 'Request received'});
});


// Routes
app.post('/commercialService', async (req, res) => {

    console.log('getting info from transactional database');



    const ocrResponse = await post(`http://localhost:${ports.OcrService}/ocr`, {
        title: 'media title',
        description: 'media description',
        url: 'media url'
    })
    console.log(ocrResponse.data)


    const databaseResponse = await get(`http://localhost:${ports.DatabaseService}/database`, {
        database: 'data',
    })
    console.log(databaseResponse.data)


    // send notification message to the notification service
    await post('http://localhost:4000/notify', {
        message: 'Job completed ! From Commercial service!'
     
      });

    const riskManagementResponse = await get(`http://localhost:${ports.RiskManagementService}/riskManagement`, {
        database: 'data',
    })

    console.log(riskManagementResponse.data)



    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });

    res.send({message: 'sending data for risk management'});
});