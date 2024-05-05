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

    // send to request to localhost 4005
    const mediaResponse = await post(`http://localhost:4005/${ports.MediaService}`, {
        title: 'media title',
        description: 'media description',
        url: 'media url'
    })
    console.log(mediaResponse.data)


    const databaseResponse = await post(`http://localhost:4004/${ports.DatabaseService}`, {
        database: 'data',
    })
    console.log(databaseResponse.data)


    console.log('Sending to Commercial Service');
    const commercialResponse = await post(`http://localhost:4004/${ports.CommercialService}`, {
        title: 'Commercial title',
        description: 'Commercial description',
        url: 'Commercial url'
    })
    console.log(commercialResponse.data)



    res.send({message: 'Loan started'});

});

