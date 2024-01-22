import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Genres_list = () => {
  const { store, actions } = useContext(Context);
  const handleDeleteGenre = (genre_id) => {
    actions.deleteGenre(genre_id);
  };
  return (
    <div className="container">
      <ul className="list-group">
        {store.genres.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}
            >
              <Link to={"/genresList/" + index}>
                <span>{item.type}</span>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteGenre(item.id)}
              >
                Delete Genre
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
      <Link to="/formGenres/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          add genre
        </span>
      </Link>
    </div>
  );
};
