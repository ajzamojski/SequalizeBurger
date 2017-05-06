// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/index", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burgers.findAll({ include: [db.Customer] }).then(function(results) {
      // We have access to the todos as an argument inside of the callback function
      // res.send(results);
      var hbsObject = {
      burgers: results
    };
      console.log(results);
      res.render("index", hbsObject);
      // res.json(results);
    }); // ends function results callback

  }); //ends get route for /index

  //get call retrieves all data from the database
  app.get("/api/index", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burgers.findAll({}).then(function(results) {
      // We have access to the todos as an argument inside of the callback function
      // res.send(results);
      var hbsObject = {
      burgers: results
    };
      console.log(results);
      res.json(results);
    }); //ends findAll callback function

  }); //ends /api/index get request

  //post made to burgers database when creating a new burger
  app.post("/index", function(req, res) {
    // console.log('we made it to api-routes' + req.body.name);
    var condition = false;
    db.burgers.create({
      burger_name: req.body.name,
      devoured: false
    }).then(function(results) {
    	console.log("creating results:  ...")
    	console.log(results);
      res.redirect("/index");
    }); //end callback results function
  }); // ends post request /index

 //Route to update the devoured status of the burger an by whom
  app.put("/index:id", function(req, res) {

  	//variables are extracted from the body of the index file
  	var customer = req.body.personName.toUpperCase();
  	var number = req.params.id;

  	//first we create a customer in the database by adding a name
  	db.Customer.create({customerName: customer, burgerId: number})
    	.then(function(data) 
    	{
    		console.log("customer created successfully");
    		console.log(data.customerName);
		  	var condition = {
				devoured: req.body.devour,
				CustomerId: data.id
				};
    		//we then update the burgers database which is linked to the customer db,
    		// and refresh the page which should display that the burger was eaten and by whom
		    db.burgers.update(condition,
		      {
		        where: {
		          id: number
		        }
		      })
		    .then(function(results) {
		      res.redirect("/index");
		    });

    	}); //ends Customer.create request
  }); // ends route /index:id route 

};