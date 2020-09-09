const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

let userData = {};

//set up a static folder
app.use(express.static(`${__dirname}/public`));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//set up template engine
app.set("view engine", "hbs");

//Routes
app.get("/home", (req, res) => {
  res.render("");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutUs");
});

app.get("/product", (req, res) => {
  res.render("product");
});

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
  let currentData = JSON.parse(
    fs.readFileSync(`${__dirname}/public/data/user.json`)
  );
  console.log(currentData);
  currentData.push(req.body);
  console.log(currentData);
  fs.writeFileSync(
    `${__dirname}/public/data/user.json`,
    JSON.stringify(currentData)
  );
  res.send("Login successful");
});

app.post("/login", function (req, res) {
  let currentData = JSON.parse(fs.readFileSync(`${__dirname}/public/data/user.json`));
    // console.log(currentData);
  const { uname, pswd } = req.body;
//   console.log({ uname, pswd });

    let login = false;
  for(let i = 0; i<currentData.length; i++){
      if(currentData[i].uname == uname && currentData[i].pswd == pswd){
          console.log('data found');
          userData = currentData[i];      
          login = true;
          break;
      }    
  }

  if(login == true){
    res.render('userInfo', {person: userData});
  } else{res.render('login')}

});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});