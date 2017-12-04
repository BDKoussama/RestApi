'use strict'

const mongoose = require('mongoose');

//connect to  mongodb server
mongoose.connect("mongodb://localhost:27017/sandbox");

const db = mongoose.connection;

db.on("error", function(err) {
  console.err("connection error", err);
});
// db open and ready to listen
db.once("open", function() {
  console.log("db connection successful");
  //All database communication goes here
  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: {
      type: String,
      default: "goldfish"
    },
    size: {
      type: String
    },
    color: {
      type: String,
      default: "golden"
    },
    mass: {
      type: Number,
      default: 0.007
    },
    name: {
      type: String,
      default: "Angela"
    }

  });

  AnimalSchema.pre("save", function(next) {
    if (this.mass >= 100) {
      this.size = "big";
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = "medium";
    } else {
      this.size = "small";
    }
    next();
  });
  //helpful for creating custom Queries
  AnimalSchema.statics.findSize = function(size, callback) {
    //this == animal
    return this.find({
      size: size
    }, callback)
  }

  // instance methods
  AnimalSchema.methods.findSameColor = function(callback) {
    //this == document
    return this.model("Animal").find({
      color: this.color
    }, callback )
  }

  // we use the schema to create a model
  var Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    color: "grey",
    mass: 6000,
    name: "Lawrence"
  });
  var animal = new Animal({}); // goldenFish
  var whale = new Animal({
    type: "whale",
    mass: 190500,
    name: "fig"
  });

  var animalData = [{
      type: "mouse",
      color: "grey",
      mass: 0.035,
      name: "Marvin"
    },
    {
      type: "nutria",
      color: "brown",
      mass: 6.035,
      name: "Gretchen"
    },
    {
      type: "worlf",
      color: "grey",
      mass: 45,
      name: "Iris"
    },
    elephant,
    animal,
    whale
  ];

  //Nested Callbacks or the pyramid of Do
  Animal.remove({}, function(err) {
    if (err) console.error(err);
    Animal.create(animalData, function(err, animals) {
      if (err) console.error(err);
      Animal.findOne({
        type: "elephant"
      }, function(err, elephant) {
        if (err) console.error(err);
        elephant.findSameColor(function(err, animals) {
          animals.forEach(function(animal) {
            console.log(animal.name + " the " + animal.color + "  " + animal.type + "is a " + animal.size + " - sized anmal");
          });
          //close db con at the end
          db.close(function() {
            console.log("db connection closed");
          });
        });
      });
    });
  });
});
