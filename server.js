require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send(`API running`));

// Define the routes in different files
app.use('/api/listings', require('./routes/api/listings'));
app.use('/api/prices', require('./routes/api/prices'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));