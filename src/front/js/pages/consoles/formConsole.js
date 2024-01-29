import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export const FormConsole = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [year, setYear] = useState("");

  //LOGICA PARA SUGERIR CONSOLES DESDE LA API EXTERNA
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);
  const navigate = useNavigate();

  // const videogamesArray = store.videogames.map((videogame) => videogame.name);
  const consolesArray = store.consoles.map((console) => console.name);
  const genresArray = store.genres.map((genre) => genre.name);

  const combinesArray = [...consolesArray, ...genresArray];

  const handleSearch = (e) => {
    e.preventDefault();

    for (let i = 0; i < consolesArray.length; i++) {
      if (consolesArray[i] === textInput)
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
        const response = await fetch(`https://api.rawg.io/api/platforms?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`);
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

  //LOGICA PARA AÑADIR CONSOLE
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
    <div className="container card mt-5">
      <h2m className="m-3">Add Console</h2m>
      <formm className="m-3">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setTextInput(e.target.value)}
          className="form-control"
        // onKeyDown={handleKeyPress}
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
              {searchResults.map((console) => (
                <li key={console.id} className="list-group-item">
                  <Link to={`/platforms/${console.id}`}>{console.name}</Link>
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
        <label htmlFor="year">Search your console here:</label> 
        <input
          type="text"
          name="name"
          // value={name}
          onChange={(e) => setTextInput(e.target.value) && handleInputChange}
          className="form-control"
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
      </formm>
    </div>
  );
};

FormConsole.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  year: PropTypes.number,
};
