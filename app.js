var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var expressSession = require("express-session");
var User = require("./models/user");

var resultRoutes = require("./routes/results");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/movie");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(expressSession({
    secret: "Movie database using imdb",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/results", resultRoutes);

app.listen(3000, function(){
    console.log("Movie App has started!!!");
});

// app.listen(process.env.PORT, process.env.IP);