const mongoose = require("mongoose");
mongoose.set('runValidators', true);//to run validation in the update we put global setting :)
mongoose
  .connect("mongodb://localhost/pet_database")
  .then(() => console.log("Succesfully connected to the database"))
  .catch((err) => console.log("Failed to connect to the database".err));