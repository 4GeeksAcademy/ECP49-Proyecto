import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const FormVideogame = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [pegi, setPegi] = useState("");
  const [year, setYear] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "pegi") {
      setPegi(value);
    } else if (name === "year") {
      setYear(value);
    }
  };

  const addVideogame = () => {
    const newVideogame = {
      name: name,
      pegi: pegi,
      year: year,
    };
    actions.addVideogame(newVideogame);
    resetForm();
    console.log("Nuevo videojuego JSON:", newVideogame);
  };

  const resetForm = () => {
    setName("");
    setPegi("");
    setYear("");
  };

  return (
    <div>
      <h2>Add Videogame</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <label htmlFor="pegi">PEGI:</label>
        <input
          type="number"
          name="pegi"
          value={pegi}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <label htmlFor="year">Year:</label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <button type="button" onClick={addVideogame} className="btn btn-primary">
          Add Videogame
        </button>
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </form>
    </div>
  );
};

FormVideogame.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
