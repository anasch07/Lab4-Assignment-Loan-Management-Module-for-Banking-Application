const express = require('express');
const {info} = require("js-logger");
const {post,get} = require("axios");

const app = express();
const PORT =  4007;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Function to get top 10 industries by count


// Function to get top 10 industries by count
app.get('/', (req, res) => {
    console.log('Request received for External Access Service');
    res.send({message: 'Request received'});
});


// Routes
app.get('/externalAccessService', async (req, res) => {

 console.log('doing external access');
          res.send({message: 'External Access done'});
}
);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
