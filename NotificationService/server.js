const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Notification endpoint
app.post('/notify', (req, res) => {
    console.log('Notification received:', req.body.message);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'notification', payload: req.body.message }));
        }
    });
    res.status(200).send({ status: 'Success', message: 'Notification received and dispatched' });
});

// WebSocket connection event handler
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('Received message:', message);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
