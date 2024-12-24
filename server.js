// Load environment variables
require('dotenv').config();

// Importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3030;
console.log(port);

// Import routes
const restaurantRoutes = require('./routes/restaurantsRoutes');
const kamsRoutes = require('./routes/kamsRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const interactionsRoutes = require('./routes/interactionsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/kams', kamsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/interactions', interactionsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Default route for GET
app.get('/', (req, res) => {
    res.send('Welcome to the KAM Lead Management System API!');
});

// Handling 404
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});