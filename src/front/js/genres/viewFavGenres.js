import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css"
import "../../styles/buttons.css"
import "../../styles/list.css"

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
      <div className="home">
        <div className="container text-center">
        <h2>My Favorites Genres</h2>
        </div>
        <div className="list">
        <ul className="list-group">
            {store.favoriteGenres.map((genreFav, index) => (
            <li key={index} className="list-group-item list m-1">
              <h5>{genreFav.type}</h5>

            <div className="d-flex justify-content-end">

            <Link to={"/genres/" + index}>
              <button className="btn btn-sm m-2 btn-green">View More...</button>
            </Link>

            <button className="btn btn-lg" style={{color: "#EAECCC"}} onClick={() => handleToggleFavorite(genreFav.id)}>
              <i class="fa-solid fa-star"></i>
            </button>

            </div>

            </li>
          ))}
        </ul>
        </div>
      </div>
    </>
  );
};