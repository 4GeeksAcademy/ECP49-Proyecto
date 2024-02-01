import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import '../../../styles/home.css';

export const FormVideogame = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [pegi, setPegi] = useState("");
  const [year, setYear] = useState("");
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();

    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].name === textInput) {
        const selectedGame = searchResults[i];
        setName(selectedGame.name);
        setPegi(selectedGame.pegi || "");
        setYear(selectedGame.released ? new Date(selectedGame.released).getFullYear() : "");
        setIsSearchResultsVisible(false);
        return;
      }
    }

    console.log("No match found");
  };

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`
        );
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
      setIsSearchResultsVisible(false);
    }
  }, [textInput]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setTextInput(value);
      // Limpiar pegi y year cuando cambia el nombre
      setPegi("");
      setYear("");
    } else if (name === "pegi") {
      setPegi(value);
    } else if (name === "year") {
      setYear(value);
    }
  };

  const handleSearchResultClick = (game) => {
    setName(game.name);
    setPegi(game.pegi !== undefined ? game.pegi : "");
    setYear(game.released ? new Date(game.released).getFullYear() : "");
    setIsSearchResultsVisible(false);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addConsole();
    }
  };

  const resetForm = () => {
    setName("");
    setPegi("");
    setYear("");
  };

  return (
    <div className="container card mt-5 list">
      <h2 className="m-3">Add Videogame</h2>
      <form className="m-3" onSubmit={handleSearch}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="form-control"
        />
        <div className="dropdown position-absolute mt-3 card bg-light">
          {isSearchResultsVisible && searchResults.length > 0 && (
            <ul>
              {searchResults.map((game) => (
                <li key={game.id} className="list-group my-4">
                  <a onClick={() => handleSearchResultClick(game)}>{game.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <br />
        <label htmlFor="pegi">PEGI:</label>
        <input
          type="number"
          name="pegi"
          value={pegi}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="form-control"
        />
        <br />
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="form-control"
        />
        <br />
        <button type="button" onClick={addVideogame} className="btn btn-md m-2 btn-green">
          Add Videogame
        </button>
        <Link to="/videogames/">
          <span className="btn btn-md m-2 btn btn-md m-2 btn-beige" href="#" role="button">
            Back Videogames
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