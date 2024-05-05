const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.RiskManagementService;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Function to get top 10 industries by count


// Function to get top 10 industries by count
app.get('/', (req, res) => {
    console.log('Request received for Risk Management Service');
    res.send({message: 'Request received'});
});


// Routes
app.get('/riskManagement', async (req, res) => {

        const ocrResponse = await post(`http://localhost:${ports.OcrService}/ocr`, {
            title: 'media title',
            description: 'media description',
            url: 'media url'
        })
        console.log(ocrResponse.data)


        const databaseFetchResponse = await get(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log(databaseFetchResponse.data)


        const externalAccessServiceFetchResponse = await get(`http://localhost:${ports.ExternalService}/externalAccessService`, {
            database: 'data',
        })
        console.log(externalAccessServiceFetchResponse.data)


        console.log('doing risk management');



        const databaseResponse = await get(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log(databaseResponse.data)
        
        // send notification message to the notification service
        await post('http://localhost:4000/notify', {
        message: 'Job completed ! From Risk Management service!'
    });

        console.log('sending data for credit Service');

        res.send({message: 'Risk Management done'});

}
);




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
