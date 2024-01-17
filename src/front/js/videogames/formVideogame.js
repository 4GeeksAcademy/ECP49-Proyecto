import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const FormVideogame = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [pegi, setPegi] = useState("");
  const [year, setYear] = useState("");
  const [contactLink, setcontactLink] = useState(null);

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

  const addVideogames = () => {
    const newContact = {
      name: name,
      pegi: pegi,
      year: year,
    };
    setcontactLink(newContact);
    actions.addVideogame(newContact);
    deleteHandleInputChange();
    console.log("Nuevo contacto JSON:", newContact);
  };

  const deleteHandleInputChange = () => {
    setName("");
    setPegi("");
    setYear("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addVideogames();
    }
  };
  return (
    <div>
      <h2>Edit Videogame</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
        />
        <br />

        <label htmlFor="pegi">PEGI:</label>
        <input
          type="number"
          name="pegi"
          value={pegi}
          onChange={handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
        />
        <br />

        <label htmlFor="year">Year:</label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
        />
        <br />

        <button
          type="button"
          onClick={addVideogames}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={deleteHandleInputChange}
          className="btn btn-primary"
        >
          Delete Videogame
        </button>
      </form>
    </div>
  );
};

FormVideogame.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
