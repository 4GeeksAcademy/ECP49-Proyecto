import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import '../../../styles/home.css';

export const FormConsole = () => {
  const { store, actions } = useContext(Context);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [year, setYear] = useState("");
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de búsqueda
  };

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/platforms?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`);
        const data = await response.json();

        setSearchResults(data.results || []);
        setIsSearchResultsVisible(true);
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      }
    };

    if (textInput.trim() !== "") {
      fetchRawgData();
    } else {
      setSearchResults([]);
      setIsSearchResultsVisible(true);
    }
  }, [textInput]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setTextInput(value);
      setCompany(""); // Limpiar el campo company
      setYear(""); // Limpiar el campo year
    } else if (name === "company") {
      setCompany(value);
    } else if (name === "year") {
      setYear(value);
    }
  };

  const handleSearchResultClick = (console) => {
    setName(console.name);
    setCompany(console.company || ""); // Asegurarse de que la API proporciona la información de la empresa
    setYear(console.year_end || ""); // Asegurarse de que la API proporciona la información del año
    setIsSearchResultsVisible(false);
  };

  const addConsole = () => {
    const newConsole = {
      name: name,
      company: company,
      year: year,
    };
    actions.addConsole(newConsole);
    resetForm();
    console.log("Nueva consola JSON:", newConsole);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addConsole();
    }
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setYear("");
  };

  return (
    <div className="container card mt-5 list">
      <h2 className="m-3">Add Console</h2>
      <form className="m-3" onSubmit={handleSearch}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
        />
        <div className="dropdown position-absolute mt-3 card bg-light">
          {/* Render search results */}
          {isSearchResultsVisible && searchResults.length > 0 && (
            <ul>
              {searchResults.map((console) => (
                <li key={console.id} className="list-group my-4">
                  <a onClick={() => handleSearchResultClick(console)} className="list-group-item my-4">{console.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
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

        <button type="button" onClick={addConsole} className="btn btn-md m-2 btn-green">
          Add Console
        </button>
        <Link to="/consoles">
          <span className="btn btn-md m-2 btn btn-md m-2 btn-beige" href="#" role="button">
            Back Consoles
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