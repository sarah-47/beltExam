const PetController = require("../controllers/pet.controller");

function PetRoutes(app) {
  
  
  app.post("/api/pets/new", PetController.createNewPet);
  app.get("/api/pets/:id", PetController.findOnePet);
  app.get("/api/pets", PetController.getAllPets);
  app.put("/api/pets/:id/edit", PetController.updatePet);  
  app.delete("/api/pets/:id/delete", PetController.deletePet);
  app.put("/api/pets/:id/:like/like", PetController.updateLikes);
}

module.exports = PetRoutes;
