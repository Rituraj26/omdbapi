var express = require("express");
var router = express.Router();
var request = require("request");
var Movie = require("../models/movies");
var middleware = require("../middleware/index");

router.get("/", function(req, res){
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=a50df30b&s=" + query;
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body)
			res.render("results", {data: data});
		}
	});
});

router.post("/addMovie", middleware.isLoggedIn, function(req, res) {
	req.body.movie.author = {
		id: req.user._id,
		username: req.user.username
	}
	Movie.create(req.body.movie, function(err, movie) {
		if (err) {
			return res.redirect('back');
		}
		res.redirect('back');
	});
});

module.exports = router;