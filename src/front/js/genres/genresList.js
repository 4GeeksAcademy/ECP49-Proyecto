import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Genres_list = () => {

  const { store, actions } = useContext(Context);
  const handleDeleteGenre = async (genre_id) => {
    try {
      console.log("Deleting genre with id:", genre_id);
      await actions.deleteGenre(genre_id);
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  return (
    <div className="container">
      <ul className="list-group">
        {store.genres == false && <p>...loading</p>}
        {store.genres.length > 0 &&
          store.genres.map((genre, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={"/genres/" + index} className="text-decoration-none">
                  <span>{genre.type}</span>
                 </Link>

                <Link
                  className="btn btn-success"
                  to={"/genres/" + index}
                >
                  Learn More...
                </Link>

                <button className="btn btn-success" onClick={()=>actions.addFavoriteGenre(genre.type)}>Like!</button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteGenre(genre.id)}>
                  Delete
                </button>

                <Link to={`/genres/edit/${genre.id}`}>
                 
                  <button className="btn btn-primary">Edit</button>
                  

                </Link>



          </li>
            );
          })}
      </ul>
      <br />

  <Link to="/">
        <button className="btn btn-primary">Back Home</button>
      </Link>
      <Link to="/formGenres/">
        <button className="btn btn-success">Add Genre</button>
      </Link>
 <Link to="/viewFavGenres/">
        <button className="btn btn-warning">Favorites</button>
      </Link>
    </div>
  );
};

Genres_list.propTypes = {
  type: PropTypes.string,
 
};
