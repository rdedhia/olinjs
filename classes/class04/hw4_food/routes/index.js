var home = function(req, res){
  res.render("home");
};

var ingredients = function(req, res) {
  res.render("ingredients", {price: 5});
}

module.exports.home = home;
module.exports.ingredients = ingredients;
