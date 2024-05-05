const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const app = express();
const PORT =  4009;


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
        const mediaResponse = await post('http://localhost:4005/media', {
            title: 'media title',
            description: 'media description',
            url: 'media url'
        })
        console.log(mediaResponse.data)

        const databaseResponse = await post('http://localhost:4004/database', {
            database: 'data',
        })
        console.log(databaseResponse.data)

        res.send({message: 'credit service done'});



    }
)




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
