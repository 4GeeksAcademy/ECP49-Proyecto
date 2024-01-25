import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const FormConsole = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [year, setYear] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "company") {
      setCompany(value);
    } else if (name === "year") {
      setYear(value);
    }
  };

  const addConsole = () => {
    const newConsole = {
      name: name,
      company: company,
      year: year,
    };
    actions.addConsole(newConsole);
    deleteHandleInputChange();
    console.log("Nueva consola JSON:", newConsole);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addConsole();
    }
  };

  const deleteHandleInputChange = () => {
    setName("");
    setCompany("");
    setYear("");
  };

  return (
    <div>
      <h2>Add Console</h2>
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

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          value={company}
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

        <button type="button" onClick={addConsole} className="btn btn-primary">
          Add Console
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

FormConsole.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  year: PropTypes.number,
};
