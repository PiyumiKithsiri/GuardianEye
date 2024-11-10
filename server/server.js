const express = require('express');
// const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const foundPatientsRoutes = require('./routes/auth');
const http = require('http');
const WebSocket = require('ws');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connectDB();
const connectDB = async () => {
await mongoose.connect('mongodb://localhost:27017/eyedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
}

app.use('/api/auth', require('./routes/auth'));

connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the foundpatients routes
app.use(foundPatientsRoutes);


// Define Routes
// app.use('/api/auth', require('./routes/auth'));

// Middleware setup
app.use(express.json());

// Initialize HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket broadcast function
function broadcastData(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Middleware for WebSocket availability across other modules
app.use((req, res, next) => {
    req.wssBroadcast = broadcastData; // Attach broadcast function to req object
    next();
});

// Use auth routes
app.use('/api', authRoutes);

const PORT =  5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));