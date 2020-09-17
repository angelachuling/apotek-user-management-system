const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { userInfo } = require("os");
const mongoose=require('mongoose');
const User=require('./model/schema');
const Product=require('./model/productModel');
const { runInNewContext } = require("vm");
//set up a static folder
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
// connect to Database
mongoose.connect('', {useUnifiedTopology: true,useNewUrlParser: true})
         .then(()=>{console.log('MongoDB is connected ...')})
         .catch((err)=>{console.log(err)})
let userData = {};
//set up a static folder
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true})
);
//set up template engine
app.set("view engine", "hbs");

//Routes
app.get("/home", (req, res) => {
  res.render("");
});
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutUs");
});

app.get("/product", (req, res) => {
  let productData = JSON.parse(fs.readFileSync(`${__dirname}/public/data/product.json`));
  res.render("product",{product:productData});
});
app.get("/master-product", (req, res) => {
  res.render("masterProduct");
});

app.post("/master-product", (req, res) => {
 console.log(req.body);
 let newItem=req.body;
 res.render("productStock",{newItem})

 let newProduct=new Product(req.body); 
 newProduct.save(()=>{console.log('Data is saved in DB')})
});

app.post("/master-product/delete", (req, res) => {
  console.log(req.body);

 });
 
//  app.post("/master-product/update", (req, res) => {
//   console.log(req.body);
//   let item = {
//     id: req.body.id,
//     proName: req.body.proName,
//     quantity: req.body.quantity,
//     description: req.body.description,
//     retailPrice: req.body.retailPrice,
//     purchasePrice: req.body.purchasePrice,
//     percentage_discount: req.body.percentage_discount,
//     src: req.body.src 
//   }
//   const id = req.body.id;
//   mongo.connect('mongodb+srv://Chuling:011040514@cluster0.i4ctq.mongodb.net/Apotek', function(err, db){
//     db.collection('Products').updateOne({"_id": objectID(id)}, {$set: item}, function(err, result){
//       console.log('Item Updated')
//       db.close();
//     })
//   })
//  });
 

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/admin/acs', (req, res) => {
  res.render('userInfo', userData);
})

app.post("/signup", function (req, res) {
  console.log(req.body);
  let currentData = JSON.parse(fs.readFileSync(`${__dirname}/public/data/user.json`));
  console.log(currentData);
  currentData.push(req.body);
  console.log(currentData);
  fs.writeFileSync(`${__dirname}/public/data/user.json`, JSON.stringify(currentData));
  res.render("Login");
  let newUser=new User(req.body); 
  newUser.save(()=>{console.log('Data is saved in DB')})
});

app.post("/login", function (req, res) {
  let currentData = JSON.parse(fs.readFileSync(`${__dirname}/public/data/user.json`));
  // console.log(currentData);
  const { uname, pswd } = req.body;
  let login = false;
  for (let i = 0; i < currentData.length; i++) {
    if (currentData[i].uname == uname && currentData[i].pswd == pswd) {
      console.log('data found');
      console.log(req.body)
      userData = currentData[i];
      login = true;
      break;
    }
  }
  if (login == true) {
    console.log('login')
      if (userData.role == "user") res.redirect('/product') 
      else if (userData.role == "admin") res.render('userInfo',{ userData })
      else if (userData.role == "worker") res.send('I am worker')
      else res.send('You have to register')
  } else { res.render('login') }
});
app.listen(5000, () => {
  console.log("Listening to port 5000");

});


