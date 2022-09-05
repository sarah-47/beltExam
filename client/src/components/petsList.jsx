import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PetList = () => {
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pets").then((response) => {
      setPetsList(response.data.records);
    });
  }, []);
  return (
    <div>
      <Link to="/pets/new">Add a pet to the shelter</Link>
      <h4 className="text-start">These pets are looking for a good home</h4>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {petsList.map((pet, index) => {
            return (
              <tr key={index}>
                <td>{pet.petName}</td>
                <td>{pet.petType}</td>
                <td><Link to={`/pets/${pet._id}`}>details</Link> | <Link to={`/pets/${pet._id}/edit`}>edit</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
