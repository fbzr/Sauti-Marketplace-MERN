require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const path= require('path');

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));


// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Define the routes in different files
app.use('/api/listings', require('./routes/api/listings'));
app.use('/api/prices', require('./routes/api/prices'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// DEPLOYMENT - Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('/client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));