const express = require('express');
const app = express();

//set up a static folder
app.use(express.static(`${__dirname}/public`));

//set up template engine
app.set('view engine', 'hbs');


//Routes
app.get('/home', (req, res) => {
    res.render('');
})

app.get('/aboutus', (req, res) => {
    res.render('aboutUs');
})

app.get('/product', (req, res) => {
    res.render('product');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    console.log(req.body);
})


app.listen(5000, () => {console.log('Listening to port 5000')});
