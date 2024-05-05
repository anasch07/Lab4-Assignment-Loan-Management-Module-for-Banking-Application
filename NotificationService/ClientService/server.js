const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoURL = 'mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net/batch?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// MongoDB schema and model
const CompanyCountSchema = new mongoose.Schema({
    industry: String,
    count: String
}, { collection: 'company_count' });

const CompanyCountModel = mongoose.model('company_count', CompanyCountSchema);


async function getTop10() {
    try {
        return await CompanyCountModel.find().sort({ count: -1 }).limit(10);
    } catch (error) {
        throw new Error('Error fetching top 10 industries:', error);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Server is up');
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection event handler
wss.on('connection', async (ws) => {
    console.log('Client connected');

    try {
        // Send initial top 10 data to client on connection
        const top10 = await getTop10();
        ws.send(JSON.stringify({ type: 'batch', payload: top10 }));
    } catch (error) {
        console.error('Error sending initial top 10 data:', error);
    }
});

// MongoDB change stream event handler
const changeStream = CompanyCountModel.watch();

changeStream.on('change', async (change) => {
    console.log('Change stream event:', change);

    try {
        // Fetch updated top 10 data
        const top10 = await getTop10();
        // Send updated top 10 data to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'batch', payload: top10 }));
            }
        });
    } catch (error) {
        console.error('Error fetching and sending top 10 data:', error);
    }
});
