const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { userInfo } = require("os");
const mongoose = require('mongoose');
const User = require('./model/schema');
const url = require('url')
const Product = require('./model/productModel');
let newItem, sellingItem = [], amount = 0, totalPrice, msg;
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
// connect to Database
let mongoDbUrl = "mongodb+srv://Admin:Asreen1981@asreen-cluster.miipv.mongodb.net/apotheke"
mongoose.connect(mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log('MongoDB is connected ...') })
  .catch((err) => { console.log(err) })
let userData = {};
//set up a static folder
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true })
);
//set up template engine
app.set("view engine", "hbs");

//Routes
app.get("/home", (req, res) => {
  res.render("", { title: 'main page' });
});

app.get("/master-product", (req, res) => {
  res.render("masterProduct", { title: 'Add a product' });
});

app.get("/delete-product", (req, res) => {
  msg = (req.query.msg) ? req.query.msg : ''
  console.log(msg);
  res.render("deleteProduct", { title: 'Delete data', newItem, msg });
});
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/pointOfSale", (req, res) => {
  res.render("pointOfSale", { sellingItem });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutUs", { title: 'about us' });
});
app.get("/admin-overview", (req, res) => {
  res.render("admin-overview", { title: 'Admin-page' });
});
app.get("/admin-product", (req, res) => {
  Product.find((err, data) => {
    if (err) console.log(err)
    else {
      res.render("admin-overview", { product:data, title: 'admin product page' });
    }
  })
});
app.get("/admin-user", (req, res) => {
  User.find((err, data) => {
    if (err) console.log(err)
    else {
      console.log(data);
      res.render("admin-overview", { user:data, title: 'admin user page' });
    }
  })
});
app.get("/product", (req, res) => {
  Product.find({}, (err, data) => {
    if (err) console.log(err)
    else {
      console.log(data);
      res.render("product", { product: data, title: 'product page' })
    }
  });
});
app.get("/master-product", (req, res) => {
  res.render("masterProduct", { title: 'master-product' });
});
app.get("/delete/:id", (req, res) => {
  Product.find({ _id: req.params.id }, (err, data) => {
    console.log(data)
    if (err) console.log('error from server' + err)
    else { //res.send('data is '+ data)
      newItem = data[0]
      res.redirect("/delete-product");
    }
  })
});

app.post("/master-product", (req, res) => {
  newItem = req.body;
  console.log(req.body);
  let newProduct = new Product(req.body)
  newProduct.save((err) => {
    if (err) console.log(err)
    else { console.log('Data is saved......') }
  });
  res.redirect("/product")
});
app.post("/delete/:id", (req, res) => {
  newItem = req.body;
  let id = req.params.id;
  console.log(id)
  console.log(req.params.id)
  Product.deleteOne({ id: req.params.id }, (err, result) => {
    if (err) console.log(err);
    msg = 'One Product has been Deleted!';
    res.redirect(url.format({
      pathname: '/delete-product',
      query: { msg }
    }));
    console.log("Product Removed")
  })
});
app.get("/update-product", (req, res) => {
  res.render("updateProduct", { title: 'update data', newItem, msg });
});
app.get("/update/:id", (req, res) => {
  Product.find({ _id: req.params.id }, (err, data) => {
    console.log(data)
    if (err) console.log('error from server' + err)
    else { //res.send('data is '+ data)
      newItem = data[0]
      res.redirect("/update-product");
    }
  })
});
app.post("/update/:id", (req, res) => {
  console.log('update post')
  newItem = req.body;
  let id2 = req.body.id;
  console.log(id2)
  Product.findOneAndUpdate({ id: id2 }, req.body, { new: true }, (err, data) => {
    if (err) throw err
    else {
      console.log('data updated', "Result :" + data);
      msg = 'One Product has been Updated!';
      res.redirect(
        url.format({
          pathname: '/update-product',
          query: { msg }
        }));
    }
  })
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: 'contact-page' });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/admin/acs', (req, res) => {
  res.render('userInfo', { title: 'user info' }, userData);
})

app.post("/signup", function (req, res) {
  console.log(req.body);
  let newUser = new User(req.body);
  newUser.save(() => { console.log('Data is saved in DB') })
  res.render("Login", { title: 'login-page' });
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
    else if (userData.role == "admin") res.redirect('/admin-page')
    else if (userData.role == "worker") res.redirect('/pointOfSale')
    else res.send('You have to register')
  } else { res.render('login', { title: 'login' }) }
});
app.post("/pointOfSale", function (req, res) {
  // console.log(req.body);
  const sellingProductId = req.body.sellingProductId
  // const sellingProductName = req.body.sellingProductName
  var sellingProductName;
  let sellingProductQuantity = req.body.sellingProductQuantity
  Product.find({ id: sellingProductId }, (err, data) => {
    if (err) console.log(err)
    else {
      console.log(data);
      console.log(data[0])
      totalPrice = sellingProductQuantity * data[0].retailPrice;
      console.log(totalPrice)
      sellingProductName = data[0].proName
      console.log(sellingProductName)
      // sellingProductName.value = sellingProductName
      amount = amount + totalPrice
      var itemDetail = {
        sellingItemId: data[0].id,
        sellingItemName: data[0].proName,
        sellingItemPrice: data[0].retailPrice,
        sellingItemQuantity: sellingProductQuantity,
        sellingItemTotalPrice: totalPrice,
        totalAmount: amount
      }
      console.log("item added")
      sellingItem.push(itemDetail)
      res.redirect("/pointOfSale")
      console.log("item added ****")

    }
  });




})

app.listen(5000, () => {
  console.log("Listening to port 5000");

});


