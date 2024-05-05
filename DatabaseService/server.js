const express = require('express');
const {info} = require("js-logger");


const ports = require('../ports');


const app = express();
const PORT = ports.DatabaseService;






app.get('/', (req, res) => {
    console.log('Request received for database service');
    res.send({message: 'Request received'});
});


// Routes
app.post('/database', (req, res) => {
    console.log('--------------------------------------------');
    console.log('database updated');
    res.send({message: 'database updated'});

});

app.get('/database', (req, res) => {
    console.log('--------------------------------------------');

    console.log('fetching data from database');
    res.send({message: 'data fetched'});

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});