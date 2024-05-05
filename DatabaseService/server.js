const express = require('express');
const {info} = require("js-logger");

const app = express();
const PORT =  4004;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Function to get top 10 industries by count


// Function to get top 10 industries by count
app.get('/', (req, res) => {
    console.log('Request received for database service');
    res.send({message: 'Request received'});
});


// Routes
app.post('/database', (req, res) => {
    console.log('database updated');
    res.send({message: 'database updated'});

});

app.get('/database', (req, res) => {
    console.log('fetching data from database');
    res.send({message: 'data fetched'});

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});