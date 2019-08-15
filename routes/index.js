var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Movie = require("../models/movies");
var middleware = require("../middleware/index");

router.get("/", function(req, res){
	res.render("search");
});

router.get("/register", function(req, res){
    res.render("register"); 
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.redirect("/register");
		}                 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		});
    });
});

router.get("/login", function(req, res){
    res.render("login"); 
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
    })(req, res);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.get("/dashboard", middleware.isLoggedIn, function(req, res) {
	console.log(req.user);
	Movie.find({"author.id": req.user._id}, function(err, movieDetails){
        if(err){
            console.log(err);
        } else  {
			console.log(movieDetails);
            res.render("dashboard", {movieDetails: movieDetails});
        }
    });
});

module.exports = router;