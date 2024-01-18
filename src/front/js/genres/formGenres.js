import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const FormGenres = () => {
  const { store, actions } = useContext(Context);
  const [genre, setGenre] = useState("");
  const [contactLink, setcontactLink] = useState(null);

  const handleInputChange = (e) => {
    const { genre, value } = e.target;
    if (genre === "genre") {
      setGenre(value);
    } 
  };

  const addGenres = () => {
    const newGenre = {
      genre: genre
    };
    setcontactLink(newGenre);
    actions.addGenres(newGenre);
    deleteHandleInputChange();
    console.log("Nuevo genero JSON:", newGenre);
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
    <div>
      <h2>Add Genre</h2>
      <form>
        <label htmlFor="genre" >Type:</label>
        <input
          type="text"
          genre="genre"
          value={genre}
          onChange={handleInputChange}
          className="form-control"
          onKeyDown={handleKeyPress}
        />
        <br />

        

        <button type="button" onClick={addGenres} className="btn btn-primary">
          add
        </button>
        <button type="button" onClick={deleteHandleInputChange} className="btn btn-primary">
          Delete Genre
        </button>
      </form>
    </div>
  );
};