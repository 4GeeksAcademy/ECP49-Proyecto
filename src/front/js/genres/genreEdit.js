import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const GenreEdit = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [genreData, setGenreData] = useState({
    type: "",
  });

  useEffect(() => {
    actions.getSingleGenre(params.theid).then((genre) => {
      setGenreData({
        type: genre.type,
      });
    });
  }, [params.theid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenreData((prevGenreData) => ({
      ...prevGenreData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    actions.updateGenre(params.theid, genreData);
  };

  return (
    <div>
      <h2>Edit Genre</h2>
      <form>
        <label htmlFor="name">Type:</label>
        <input
          type="text"
          name="type"
          value={genreData.type}
          onChange={handleInputChange}
          className="form-control"
        />

        <button
          type="button"
          onClick={handleUpdate}
          className="btn btn-primary"
        >
          Update Genre
        </button>
      </form>
    </div>
  );
};

export default GenreEdit;
