const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


//Parse MiddleWear
app.use(bodyParser.urlencoded({ extended: false }));

//Parse In Json
app.use(bodyParser.json());

//Static Files (Import CSS, Images)
app.use(express.static("public"));

//Template Engine
app.engine("hbs", exphbs.engine( {extname: ".hbs" }));
app.set("view engine", "hbs");

const routes = require("./server/routes/user")
app.use("/", routes);

app.listen(port, () =>{
    console.log(`Listening On Port ${port}`)
});


