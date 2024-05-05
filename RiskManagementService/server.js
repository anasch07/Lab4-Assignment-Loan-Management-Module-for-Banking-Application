const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.RiskManagementService;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.get('/', (req, res) => {
    console.log('Request received for Risk Management Service');
    res.send({message: 'Request received'});
});


// Routes
app.get('/riskManagement', async (req, res) => {
        console.log('--------------------------------------------');

         await get(`http://localhost:${ports.OcrService}/ocr`, {
            title: 'media title',
            description: 'media description',
            url: 'media url'
        })
        console.log("OCR Done");


         await get(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log("Fetched from Database Service");


        await get(`http://localhost:${ports.ExternalService}/externalAccessService`, {
            database: 'data',
        })
        console.log("External Access Done");


        console.log('doing risk management');



        await post(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log('Wrote to Database Service');

        
        // send notification message to the notification service
        await post(`http://localhost:${ports.NotificationService}/notify`, {
        message: 'Job completed ! From Risk Management service!'
    });


        console.log('Sending to Credit Service');
        await get(`http://localhost:${ports.CreditService}/creditService`, {
            database: 'data',
        })
        console.log('Credit Service Done');


        res.send({message: 'Risk Management done'});



}
);




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
