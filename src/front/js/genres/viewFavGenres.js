import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Genres_favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteGenres().catch((error) => {
      console.error("Error fetching favorite genres:", error);
    });
  }, []); 

  const handleToggleFavorite = (genre_id) => {
    actions.toggleFavoriteGenre(genre_id);
    actions.getFavoriteGenres();
  };

  return (
    <>
      <div>
        <h2>MyFavorites Genres</h2>
        <ul className="list-group">
          {console.log(store.favoriteGenres)}
          {store.favoriteGenres.map((genreFav, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <Link to={"/genres/" + index} className="text-decoration-none">
                <span>{genreFav.type}</span>
              </Link>
              <Link className="btn btn-success" to={"/genres/" + index}>
                Learn More...
              </Link>
              <button className="btn btn-primary" onClick={() => handleToggleFavorite(genreFav.id)}>
                Like
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};