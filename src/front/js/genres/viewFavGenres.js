import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres_favorites = () => {

  const { store, actions } = useContext(Context);

  return (
    <>
    <div>
      <h2>Favorites Genres</h2>
        <ul className="list-group">
            <li>
            {store.favorites.map((genresFav)=> <p>{genresFav}</p>)}
            </li>
        </ul>
    </div>
    </>
  );
};
