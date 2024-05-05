const express = require('express');
const {post} = require("axios");
const ports = require('../ports');


const app = express();
const PORT = ports.ClientService;



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.post('/startLoan', async (req, res) => {

    console.log('--------------------------------------------');

    // send to request to localhost 4005
   await post(`http://localhost:${ports.MediaService}/media`, {
        title: 'media title',
        description: 'media description',
        url: 'media url'
    })
    console.log('Uploaded media to Media Service');



    await post(`http://localhost:${ports.DatabaseService}/database`, {
        database: 'data',
    })
    console.log('Uploaded data to Database Service');



     await post(`http://localhost:${ports.CommercialService}/commercialService`, {
        title: 'Commercial title',
        description: 'Commercial description',
        url: 'Commercial url'
    })
    console.log('Sending to Commercial Service');


    res.send({message: 'Loan started'});

});

