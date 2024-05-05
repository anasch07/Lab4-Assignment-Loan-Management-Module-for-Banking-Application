const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Notification endpoint
app.post('/notify', (req, res) => {
    console.log('Notification received:', req.body.message);
    res.status(200).send({ status: 'Success', message: 'Notification received' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
