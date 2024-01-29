import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export const FormVideogame = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [pegi, setPegi] = useState("");
  const [year, setYear] = useState("");

  //LOGICA PARA SUGERIR GAMES DESDE LA API EXTERNA
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);
  const navigate = useNavigate();

  const videogamesArray = store.videogames.map((videogame) => videogame.name);
  const consolesArray = store.consoles.map((console) => console.name);
  const genresArray = store.genres.map((genre) => genre.name);

  const combinesArray = [...videogamesArray, ...consolesArray, ...genresArray];

  const handleSearch = (e) => {
      e.preventDefault();

      for (let i = 0; i < videogamesArray.length; i++) {
          if (videogamesArray[i] === textInput)
              navigate("/videogames/" + i);
          else if (consolesArray[i] === textInput)
              navigate("/consoles/" + i);
          else if (genresArray[i] === textInput)
              navigate("/genres/" + i);
      }
      console.log("No match found");
  };

  const filteredArray = combinesArray.filter(
      (item) =>
          item && item.toLowerCase().includes(textInput.toLowerCase()) && item !== textInput
  );

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`);
        const data = await response.json();

        // Assuming the data structure from the API has a results property containing an array of games
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      }
    };

    if (textInput.trim() !== "") {
      fetchRawgData();
      setIsSearchResultsVisible(false);
    } else {
      setSearchResults([]);
      setIsSearchResultsVisible(true);
    }
  }, [textInput]);



  //LOGICA PARA AÑADIR GAME
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      if (value.trim() === "") {
        setIsSearchResultsVisible(false);
      } else if (name !== "name") {
        setIsSearchResultsVisible(false);
      }
      else {
        setIsSearchResultsVisible(true);
      }
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
    <div className="container card mt-5">
      <h2 className="m-3">Add Videogame</h2>
      <form className="m-3">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-control"
        />
        <datalist className="">
          {filteredArray.length > 0 &&
            filteredArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </datalist>
        <div className="dropdown position-absolute mt-3 card bg-light">
          {/* Render search results */}
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((game) => (
                <li key={game.id}>
                  <Link to={`/games/${game.id}`}>{game.name}</Link>
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
        <label htmlFor="year">Search your game here:</label> 
        <input
          type="text"
          name="name"
          // value={name}
          onChange={(e) => setTextInput(e.target.value) && handleInputChange}
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
