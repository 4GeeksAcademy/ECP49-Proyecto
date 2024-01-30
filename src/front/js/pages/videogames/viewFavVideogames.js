import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const Videogames_Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteVideogames().catch((error) => {
      console.error("Error fetching favorite videogames:", error);
    });
  }, []); 

  return (
    <>
      <div>
        <h2>My Favorite Videogames</h2>
        <ul className="list-group">
          {store.favoriteVideogames.map((videogameFav, index) => (
            <li key={index}>
              <p>Videogame: {videogameFav.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
