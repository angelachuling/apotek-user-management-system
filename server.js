const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./model/schema');
const Email = require('./model/emailModel');
const Product = require('./model/productModel');
const flash = require('connect-flash');
const dotenv = require('dotenv').config();
const hbs = require('hbs');
const controllers=require('./controllers/indexController')
const passport=require('passport');
const crypto = require('crypto')
const PORT = process.env.PORT;
var session = require('express-session');
const url = require('url')
const output = require('./public/outputEmail')
const path = require('path');
var multer = require('multer');
const sendEmail = require("./utils/sendEmail");
const replay = require("./public/sendEmailClient");
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
  filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) },
});
const upload = multer({ storage: storage })
// connect to Database
let mongoDbUrl = process.env.mongoURL;
mongoose.connect(mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log('MongoDB is connected ...') })
  .catch((err) => { console.log(err) })
mongoose.set('useCreateIndex', true)
//set up a static folder
app.use(express.static(`${__dirname}/public`));
//set up template engine
app.set("view engine", "hbs");
app.use(flash());
//Routes
app.get("/home",controllers.homePage );
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/allUser",controllers.allUser);
app.get("/master-product", (req, res) => {
  res.render("masterProduct", { title: 'Add a product' });
});
app.get("/delete-product",controllers.deleteProduct );
app.get("/pointOfSale", (req, res) => {
  res.render("pointOfSale", { sellingItem });
});
app.get("/aboutus", (req, res) => {
  res.render("aboutUs", { title: 'about us' });
});
app.get("/admin-overview", (req, res) => {
  res.render("admin-overview", { title: 'Admin-page' });
});
app.get("/productAjax",controllers.productAjax);
app.get("/userAjax",controllers.userAjax);
app.get("/admin-product",controllers.adminProduct);
app.get("/admin-user",controllers.adminUser);
app.get("/product",controllers.product);
app.get("/master-product", (req, res) => {
  res.render("masterProduct", { title: 'master-product' });
});
app.get("/delete/:id",controllers.deleteId);
app.post("/master-product",controllers.masterProduct);
app.get("/deleteUser/:id",controllers.deleteUser);
app.get('/userInfo', (req, res) => {
  res.render('userInfo', { userData, msg, userId })
})
app.get("/updateUser/:id",controllers.updateUser);
app.post("/updateUser/:id",controllers.updateUserPost);
app.post("/delete/:id",controllers.deleteProductPost);
app.get("/update-product", (req, res) => {
  console.log('final update', newItem)
  res.render("updateProduct", { title: 'update data', newItem, msg });
});
app.get("/update/:id",controllers.updateProductGet);
app.post("/update/:id",controllers.updateProductPost);
app.get("/contact", (req, res) => {
  // console.log(req.session.flash)
  res.render("contact", { title: 'contact-page',msgEmail:req.flash('msg') });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get('/admin/acs', (req, res) => {
  res.render('userInfo', { title: 'user info' }, userData);
})
app.post("/signup",upload.single('avatar'), controllers.signup);
app.post("/login",controllers.checkUser);
app.get("/logout", (req, res) => {
  req.session.destroy();  // remove session and go to login page
  res.redirect("/login")
})
app.post("/pointOfSale",controllers.pointOfSale)
app.get('/verify_email',controllers.verifiyEmail);
var authenticationURL;
app.post('/mailFromContact',controllers.mailContact)
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
//functions
function checklogin(req, res, next) {
  if (req.session.userLogin) {
    let role = req.session.userLogin.role;
    if (role == "user") res.redirect('/product')
    else if (role == "admin") res.redirect('/admin-overview')
    else if (role == "worker") res.redirect('/pointOfSale')
  }
  next();
}
// register partials
hbs.registerPartials(__dirname + '/views/partials/')
hbs.registerPartial('carousel', 'carousel.hbs')






