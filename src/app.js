const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// calling body-parser to handle the Request Object from POST requests
var bodyParser = require("body-parser");
// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(static_path));

// Set view Engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/payment", (req, res) => {
  res.render("payment");
});
app.get("/toorpage", (req, res) => {
  res.render("toorpage");
});

// create a new user in our database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      let newuser = new Register({
        person: req.body.person,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });
      newuser.save();

      res.status(201).redirect("/");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// login check :-
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = await Register.findOne({ email: email });
    console.log(foundUser);
    if (foundUser) {
      if (foundUser.password === password) {
        res.redirect("/");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not register");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
