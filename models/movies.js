var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    image: String,
    type: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Movie", movieSchema);
