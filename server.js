const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./model/schema');
// const takeInfo=require('./public/main')
const hbs=require('hbs')
var session = require('express-session');
const url = require('url')
const Product = require('./model/productModel');
const path = require('path');
var multer = require('multer')
let newItem, userData, sellingItem = [], amount = 0, totalPrice, msg, userId;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 24 * 60 * 60 }
}));
// setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/uploads') },
  filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))},
});
const upload = multer({storage: storage})
// connect to Database
let mongoDbUrl = "mongodb+srv://Admin:Asreen1981@asreen-cluster.miipv.mongodb.net/apotheke"
mongoose.connect(mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log('MongoDB is connected ...')})
  .catch((err) => { console.log(err) })
//set up a static folder
app.use(express.static(`${__dirname}/public`));
//set up template engine
app.set("view engine", "hbs");
//Routes
app.get("/home", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID)
  if (!req.session.viewsCount) {
    req.session.viewsCount = 1;
    console.log("Welcome to this page for the first time!");
  } else {
    req.session.viewsCount += 1;
    console.log("You visited this page " + req.session.viewsCount + " times");
  }
  res.render("", { title: 'main page' });
});
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/allUser", (req, res) => {
  User.find((err,data)=>{
  if (err) throw err
  else  res.render("displayAllUsers",{users:data});
  }) 
});
app.get("/master-product", (req, res) => {
  res.render("masterProduct", { title: 'Add a product' });
});
app.get("/delete-product", (req, res) => {
  msg = (req.query.msg) ? req.query.msg : ''
  console.log(msg);
  res.render("deleteProduct", { title: 'Delete data', newItem, msg });
});
app.get("/pointOfSale", (req, res) => {
  res.render("pointOfSale", { sellingItem });
});
app.get("/aboutus", (req, res) => {
  res.render("aboutUs", { title: 'about us' });
});
app.get("/admin-overview", (req, res) => {
  res.render("admin-overview", { title: 'Admin-page'});
});
app.get("/productAjax", (req, res) => {
  Product.find((err, data) => {
    if (err) console.log(err)
    else {
      // console.log('products',data)
      res.json(data)
    }
  })
});
app.get("/userAjax", (req, res) => {
  User.find((err, data) => {
    if (err) console.log(err)
    else {
      // console.log('users',data)
      res.send(data)
    }
  })
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
      // console.log(data);
      res.render("admin-overview", { user: data, title: 'admin user page' });
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
app.get("/deleteUser/:id", (req, res) => {
  Product.findOneAndDelete({_id: req.params.id },(err,docs) => {
    console.log(req.params.id)
    if (err) console.log('error from server' + err)
    else { //res.send('data is '+ data)
    console.log(docs)
      res.redirect("/admin-overview");
    }
  })
});
app.get('/userInfo', (req, res) => {
  res.render('userInfo', { userData, msg, userId })
})
app.get("/updateUser/:id", (req, res) => {
  userId = req.params.id;
  console.log(userId)
  User.findById(userId, (err, doc) => {
    if (err) throw err;
    userData = doc;
    console.log('data updated', "userData :" + userData);
    res.render('userInfo', { userData, msg, userId });
  })
});
app.post("/updateUser/:id", (req, res) => {
  userId = req.params.id;
  console.log(userId, req.body)
  User.findOneAndUpdate({ _id: userId }, req.body, (err, doc) => {
    if (err) throw err;
    userData = doc;
    //console.log('data updated', "userData :" + userData);
    msg = 'One user has been updated!';
    res.redirect(
      url.format({
        pathname: '/userInfo',
        query: { userData, msg }
      }));
  })
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
  console.log('final update', newItem)
  res.render("updateProduct", { title: 'update data', newItem, msg });
});
app.get("/update/:id", (req, res) => {
  Product.find({ _id: req.params.id }, (err, data) => {
    if (err) console.log('error from server' + err)
    else { //res.send('data is '+ data)
      newItem = data[0]
      res.redirect("/update-product");
    }
  })
});
app.post("/update/:id", (req, res) => {
  //console.log('update post')
  newItem = req.body;
  console.log('input data', req.body)
  let id2 = req.body.id;
  // console.log(id2)
  Product.findOneAndUpdate({ id: id2 }, req.body, { new: true }, (err, data) => {
    if (err) throw err
    else {
      //console.log('data updated', "Result :" + data);
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
app.post("/signup", upload.single('avatar'), function (req, res) {
  //console.log(req.body);
  const file = req.file;
  console.log('*save file info*')
  console.log(file)
  //console.log(req.body);
  let userInfo = req.body;
  let userObject = {
    imagePath: 'uploads/'+file.filename,
    ...userInfo
  }
  //console.log(userObject)
  let newUser = new User(userObject);
  newUser.save(() => { console.log('Data is saved in DB') })
  res.render("Login", { title: 'login-page'});
});
app.post("/login", checkUser);
app.get("/logout", (req, res) => {
  req.session.destroy();  // remove session and go to login page
  res.redirect("/login")
})
app.post("/pointOfSale", function (req, res) {
  const sellingProductId = req.body.sellingProductId
  var sellingProductName;
  let sellingProductQuantity = req.body.sellingProductQuantity
  Product.find({ id: sellingProductId }, (err, data) => {
    if (err) console.log(err)
    else {
      totalPrice = sellingProductQuantity * data[0].retailPrice;
      // console.log(totalPrice)
      sellingProductName = data[0].proName
      // console.log(sellingProductName)
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
//functions
function checkUser(req, res) {
  let role;
  console.log('req.body', req.body);
  let userFound = false;
  User.find((err, data) => {
    //console.log('check user query',data)
    if (err) console.log(err)
    data.map((item) => {
      if (item.email == req.body.email && item.pswd == req.body.pswd) {
        userFound = true;
        //console.log('item', item);
        req.session.userLogin = item;
        console.log('req.session', req.session)
        req.session.save();
        role = req.session.userLogin.role;
        console.log('role from session', role);
      }
    });
    if (userFound) {
      //console.log('userFound', userFound);
      if (role == "user") res.redirect('/product')
      else if (role == "admin") res.redirect('/admin-overview')
      else if (role == "worker") res.redirect('/pointOfSale')
    }
    else {
      console.log('userFound', userFound);
      msg = "Email or password is invalid ";
      res.render('login', { title: 'login-page', msg })
    }
  })

}
function checklogin(req, res, next) {
  if (req.session.userLogin) {
    let role = req.session.userLogin.role;
    if (role == "user") res.redirect('/product')
    else if (role == "admin") res.redirect('/admin-overview')
    else if (role == "worker") res.redirect('/pointOfSale')
  }
  next();
}
// get data for products






