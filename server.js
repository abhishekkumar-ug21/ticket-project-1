const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// Middleware
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ticketing');

// Routes
app.use('/api', routes);

// Serve the home page (for testing)
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
