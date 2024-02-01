import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
    <div className="container card mt-5 list">
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
          className="btn btn-md m-2 btn-green"
        >
          Update Genre
        </button>

        <Link to="/genresList">
          <span className="btn btn-md m-2 btn btn-md m-2 btn-beige" href="#" role="button">
            Back Genres
          </span>
        </Link>

      </form>
    </div>
  );
};

export default GenreEdit;
