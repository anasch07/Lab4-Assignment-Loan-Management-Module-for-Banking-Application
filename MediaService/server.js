const express = require('express');
const {info} = require("js-logger");

const ports = require('../ports');


const app = express();
const PORT = ports.MediaService;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    console.log('--------------------------------------------');

    console.log('Request received');
    res.send({message: 'Request received'});
});


// Routes
app.post('/media', (req, res) => {
    console.log('--------------------------------------------');

    console.log('Media uploaded');
    res.send({message: 'Media uploaded'});

});




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});