import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const FormGenres = () => {

  const { store, actions } = useContext(Context);
  const [genre, setGenre] = useState("");

  //LOGICA PARA SUGERIR GAMES DESDE LA API EXTERNA
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);
  const navigate = useNavigate();

  const genresArray = store.genres.map((genre) => genre.name);

  const combinesArray = [...genresArray];

  const handleSearch = (e) => {
    e.preventDefault();

    for (let i = 0; i < genresArray.length; i++) {
      if (genresArray[i] === textInput)
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
      const response = await fetch(`https://api.rawg.io/api/genres?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`);
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

  //LOGICA PARA AÑADIR GENRES

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    if (name === "genre") {
      setGenre(value);
    }
  };

  const addGenres = async () => {
    const newGenre = {
      type: genre,
    };

    await actions.addGenres(newGenre);
    deleteHandleInputChange();
    console.log("Nuevo genero JSON:", newGenre);
    await actions.getGenres();
  };
  const deleteHandleInputChange = () => {
    setGenre("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGenres();
    }
  };

  return (
    <div className="container card mt-5">
      <h2 className="m-3">Add Genre</h2>
      <form className="m-3">
        <label htmlFor="genre">Type:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setTextInput(e.target.value) && handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
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
              {searchResults.map((genre) => (
                <li key={genre.id}>
                  <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <label htmlFor="year">Search your genre here:</label> 
        <input
          type="text"
          name="name"
          // value={name}
          onChange={(e) => setTextInput(e.target.value) && handleInputChange}
          className="form-control"
        />
        <br />
        <button type="button" onClick={addGenres} className="btn btn-primary">
          add
        </button>

      </form>
    </div>
  );
};