const express = require('express');
const app = express();
const bodyParser=require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
//set up a static folder
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}))

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
// app.post('/login',(req,res)=>{
//     console.log(req.body);
// })
let myArray=[];
app.post('/login', function (req, res) {
    console.log(req.body);
    // myArray.push(req.body.uname[0]);
    // myArray.push(req.body.pswd[0]);
    //res.send('welcome, ' + req.body.username)
    // console.log(myArray)
  })

  app.post('/signup', function (req, res) {
    console.log(req.body);
    res.redirect('/product'); ///product is a route
    // myArray.push(req.body.uname[0]);
    // myArray.push(req.body.pswd[0]);
    //res.send('welcome, ' + req.body.username)
    // console.log(myArray)
  })


app.listen(5000, () => {console.log('Listening to port 5000')});
