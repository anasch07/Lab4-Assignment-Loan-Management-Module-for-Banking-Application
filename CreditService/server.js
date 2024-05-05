const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const ports = require('../ports');


const app = express();
const PORT = ports.CreditService;


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
app.get('/creditService', async (req, res) => {

    console.log('doing credit service');
        const mediaResponse = await post(`http://localhost:${ports.MediaService}/media`, {
            title: 'media title',
            description: 'media description',
            url: 'media url'
        })
        console.log(mediaResponse.data)

        const databaseResponse = await post(`http://localhost:${ports.DatabaseService}/database`, {
            database: 'data',
        })
        console.log(databaseResponse.data)

        res.send({message: 'credit service done'});



    }
)




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
