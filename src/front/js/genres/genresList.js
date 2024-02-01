import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/home.css"
import "../../styles/buttons.css"
import "../../styles/list.css"

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

  const handleToggleFavorite = (genre_id) => {
    actions.toggleFavoriteGenre(genre_id);
  };

  return (
    <div className="container text-center home">
      <div>
        <h2>All Genres</h2>
      </div>


      <div className="list">
        <ul className="list-group">
          {store.genres == false && <p>...loading</p>}
          {store.genres.length > 0 &&
          store.genres.map((genre, index) => {
            return (
              <li key={index} className="list-group-item list m-1">
                <h5>{genre.type}</h5>

                <div className="d-flex justify-content-end">

                <Link to={"/genres/" + index}>
                  <button className="btn btn-sm m-2 btn-green">View More...</button>
                </Link>

                {store.auth === true ?
                  <Link to={`/genres/edit/${genre.id}`}>
                    <button className="btn btn-sm m-2 btn-beige">Edit</button>
                  </Link>
                  : null}

                {store.auth === true ?
                  <button
                    className="btn btn-sm m-2 btn-red" style={{backgroundColor: "#CD8D7A"}}
                    onClick={() => handleDeleteGenre(genre.id)}>
                    Delete
                  </button>
                  : null}

                  <button
                    className="btn btn-lg" style={{color: "#EAECCC"}}
                    onClick={() => handleToggleFavorite(genre.id)}><i class="fa-solid fa-star"></i>
                    
                  </button>


                  </div>

                </li>
              );
            })}
        </ul>
      </div>
      <br />

      {store.auth === true ?
        <Link to="/formGenres/">


          <button className="btn btn-md m-2 btn-green">Add New Genre</button>

        </Link>
        : null}

    </div>
  );
};

Genres_list.propTypes = {
  type: PropTypes.string,

};
