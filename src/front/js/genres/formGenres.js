import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const FormGenres = () => {
  const { store, actions } = useContext(Context);
  const [genre, setGenre] = useState("");
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].genre === textInput) {
        const selectedGenre = searchResults[i];
        setGenre(selectedGenre.genre);
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
          `https://api.rawg.io/api/genres?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`
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
    if (name === "genre") {
      setGenre(value);
      setTextInput(value);
    }
  };

  const handleSearchResultClick = (genre) => {
    setGenre(genre.name);
    setIsSearchResultsVisible(false);
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
    setIsSearchResultsVisible(false);
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
      <form className="m-3" onSubmit={handleSearch}>
        <label htmlFor="genre">Type:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="form-control"
        />
        <div className="dropdown position-absolute mt-3 card bg-light">
          {isSearchResultsVisible && searchResults.length > 0 && (
            <ul>
              {searchResults.map((genre) => (
                <li key={genre.id}>
                  <a onClick={() => handleSearchResultClick(genre)}>
                    {genre.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <br />
        <button type="button" onClick={addGenres} className="btn btn-primary">
          add
        </button>
      </form>
    </div>
  );
};