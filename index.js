require('dotenv').config;
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 8000;

app.use('/api/v1/blog', blogRoutes);

mongoose.connect('mongodb://localhost:27017/crudblog')
    .then(
        console.log('Database Connection Succesfully')
    )
    .catch( (error) => {
        console.log(error);
    });

app.listen(port , () => {
    console.log(`Server is running at ${port}`);
});