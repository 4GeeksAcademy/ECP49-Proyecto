import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres_favorites = () => {

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavGenres()
    .catch(error => {
      console.error("Error fetching favorite genres:", error);
    });
  }, []); 

  return (
    <>
      <div>
        <h2>Favorites Genres</h2>
        <ul className="list-group">
          
          {store.favorites.map((genresFav, index) => (
            <li key={index}>
              <p>ID: {genresFav.id}</p>
              <p>Género ID: {genresFav.genres_id}</p>
              <p>User ID: {genresFav.user_id}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
