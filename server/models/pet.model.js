const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
  petName: {
    type: String,
    required: [true, "Pet Name is required"],
    minlength: [3, "Pet Name should be at least 3 charecters"],
    unique: true
  },
  petType: {
    type: String,
    required: [true, "Pet Type is required"],
    minlength: [3, "Pet Type should be at least 3 charecters"],
  },
  petDescription: {
    type: String,
    required: [true, "Pet Description is required"],
    minlength: [3, "Pet Description should be at least 3 charecters"],
  },
  skills: [{
    type: String
}],
  
  likes: {
    type: Number
  }
});

module.exports = mongoose.model("pet", PetSchema);
