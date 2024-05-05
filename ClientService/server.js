const express = require('express');
const {post} = require("axios");

const app = express();
const PORT = process.env.PORT || 4001;



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.post('/startLoan', async (req, res) => {

    // send to request to localhost 4005
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


    console.log('Sending to Commercial Service');


    res.send({message: 'Loan started'});

});

