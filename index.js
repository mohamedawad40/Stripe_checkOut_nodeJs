require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const subscribeRoute = require('./routes/subscribeRoute');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('checkout');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/cancel', (req, res) => {
    res.render('cancel');
});

app.use('/', subscribeRoute);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});