import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const PetDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [disableBtn, setDisableBtn] = useState(true);

  const [pet, setPet] = useState("");
  const [allskills, setAllskills] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`).then((response) => {
      setPet(response.data.pet);
      setAllskills(response.data.pet.skills);
      setDisableBtn(false)
    });
  }, []);

  const handleClick = () => {
    axios
      .delete(`http://localhost:8000/api/pets/${id}/delete`)
      .then(history.push("/"))
      .catch((err) => console.log(err));
  };

  const handleLike = () => {
    const likes = pet.likes + 1;
    axios
      .put(`http://localhost:8000/api/pets/${id}/${likes}/like`, {})
      .then((res) => {
        setPet({...pet, likes: likes});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Details about: {pet.petName}</h2>
      <Link to="/">Back to Home</Link>

      <button className="btn btn-danger" onClick={handleClick}>
        Adopt {pet.petName}
      </button>
      <p>Pet Type: {pet.petType}</p>
      <p>Pet Description: {pet.petDescription}</p>
      <p>
        Skills:{" "}  </p>
        {allskills.map((skill, index) => (
          <p key={index}> {skill} </p>
        ))}
    
      <button className="btn btn-success" disabled={disableBtn} onClick={handleLike}>
        Like {pet.petName}
      </button>
      <p>Like(s): {pet.likes}</p>
    </div>
  );
};
export default PetDetails;
