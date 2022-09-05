const pet = require("../models/pet.model");

function createNewPet(req, res) {
  const { petName, petType, petDescription, skills } = req.body;
  pet
    .create({
      petName: petName,
      petType: petType,
      petDescription: petDescription,
      skills: skills,
      likes:0
    })
    .then((newPet) => res.json(newPet))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to Add the new Prt :(", error: err })
    );
}

function getAllPets(req, res) {
  pet
    .find()
    .sort([["petType", "ascending"]])
    .then((AllPets) =>
      res.json({
        success: true,
        records_count: AllPets.length,
        records: AllPets,
      })
    )
    .catch((err) =>
      res.json({ message: "Failed to fetch all Pets :(", error: err })
    );
}
function findOnePet(req, res) {
  pet
    .findOne({ _id: req.params.id })
    .then((onePet) => res.json({ pet: onePet }))
    .catch((err) =>
      res.json({ message: "Failed to fetch the pet info :(", error: err })
    );
}

function updatePet(req, res) {
  const {petName, petType, petDescription, skills} = req.body

  pet.findOneAndUpdate({ _id: req.params.id },
    {
      petName: petName,
      petType: petType,
      petDescription: petDescription,
      skills: skills
    },{ new: true } )
    .then(updatedPet => res.json({ pet: updatedPet }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to ubdate your pet info :(", error: err })
    );
}

function deletePet(req, res) {
  pet
    .deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) =>
      res.json({ message: "Failed :(", error: err })
    );
}

function updateLikes(req, res) {
  const { id, like } = req.params;
  pet
    .findOneAndUpdate(
      { _id: id },
      {likes: like },
      { new: true } 
    )
    .then(updatedPet => res.json({ pet: updatedPet }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to ubdate pet likes :(", error: err })
    );
}

module.exports = {
  createNewPet,
  getAllPets,
  findOnePet,
  updatePet,
  deletePet,
  updateLikes
};
