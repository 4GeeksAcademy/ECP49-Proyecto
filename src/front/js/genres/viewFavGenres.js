import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Genres_favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteGenres().catch((error) => {
      console.error("Error fetching favorite genres:", error);
    });
  }, []); 

  return (
    <>
      <div>
        <h2>Favorites Genres</h2>
        <ul className="list-group">
          {store.favoriteGenres.map((genreFav, index) => (
            <li key={index}>
              <p>Genre: {genreFav.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};