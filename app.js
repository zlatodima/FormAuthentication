var express = require('express');
var indexRouter = require('./routes/indexRouter');
var mySQL = require("./dbConnectionController");
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.set("view engine", "ejs");

mySQL.connection.connect(function(err){
    if(err){
        console.log(err);
    }
    console.log("DB connected!");
});

var mySqlStore = new MySQLStore({}, mySQL.connection);
module.exports.store = mySqlStore;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: mySqlStore
}));

app.use("/", indexRouter);

app.listen(3000);   