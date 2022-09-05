import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";

const CreatePet = () => {
  const history = useHistory();
  const [pet, setPet] = useState({
    petName: "",
    petType: "",
    petDescription: "",
    skills: [],
  });

  const { petName, petType, petDescription, skills } = pet;

  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const [errors, setErrors] = useState([]);
  const [ferrors, setFErrors] = useState([]);

  const handleChange = (e) => {
    let errorMsg = null;
    const { name, value } = e.target;

    switch (name) {
      case "petName": {
        setPet({ ...pet, [name]: value });
        if (value.length < 1) {
          errorMsg = "Pet Name is required!";
        } else if (value.length < 3) {
          errorMsg = "Pet Name must be 3 characters or longer!";
        } else {
          errorMsg = "";
        }

        break;
      }
      case "petType": {
        setPet({ ...pet, [name]: value });
        if (value.length < 1) {
          errorMsg = "Pet Type is required!";
        } else if (value.length < 3) {
          errorMsg = "Pet Type must be 3 characters or longer!";
        } else {
          errorMsg = "";
        }

        break;
      }
      case "petDescription": {
        setPet({ ...pet, [name]: value });
        if (value.length < 1) {
          errorMsg = "Pet Description is required!";
        } else if (value.length < 3) {
          errorMsg = "Pet Description must be 3 characters or longer!";
        } else {
          errorMsg = "";
        }

        break;
      }
    }

    setFErrors({ ...ferrors, [name]: errorMsg });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/pets/new", {
        petName,
        petType,
        petDescription,
        skills: [skill1, skill2, skill3],
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        const data = err.response.data.error;
        const errorMessages = [];
        if ("errors" in data) {
          for (let field in data.errors) {
            const validationError = data.errors[field];
            errorMessages.push(validationError.message);
          }
        }
        setErrors(errorMessages);
      });
  };
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h4 className="text-start">Know a pet needing a home</h4>

      {errors.map((errorMessage, index) => (
        <div key={index} style={{ color: "red" }}>
          Error: {errorMessage}
        </div>
      ))}
      <div className="border p-5">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label className="form-label">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={petName}
              onChange={handleChange}
              className="form-control"
            />
            {ferrors.petName ? (
              <p style={{ color: "red" }}> {ferrors.petName} </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Pet Type</label>
            <input
              type="text"
              name="petType"
              value={petType}
              onChange={handleChange}
              className="form-control"
            />
            {ferrors.petType ? (
              <p style={{ color: "red" }}> {ferrors.petType} </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Pet Description</label>
            <input
              type="text"
              name="petDescription"
              value={petDescription}
              onChange={handleChange}
              className="form-control"
            />
            {ferrors.petDescription ? (
              <p style={{ color: "red" }}> {ferrors.petDescription} </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Skill 1</label>
            <input
              type="text"
              name="skills"
              value={skill1}
              onChange={(e) => setSkill1(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Skill 2</label>
            <input
              type="text"
              name="skills"
              value={skill2}
              onChange={(e) => setSkill2(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Skill 3</label>
            <input
              type="text"
              name="skills"
              value={skill3}
              onChange={(e) => setSkill3(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="Add Pet" className="btn btn-primary">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePet;
