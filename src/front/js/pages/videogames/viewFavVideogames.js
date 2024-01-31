import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

export const Videogames_Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteVideogames().catch((error) => {
      console.error("Error fetching favorite videogames:", error);
    });
  }, []); 

  const handleToggleFavorite = (videogame_id) => {
    actions.toggleFavoriteVideogame(videogame_id);
    actions.getFavoriteVideogames();
  };

  return (
    <>
     <div>
        <div className="container text-center">
        <h2>My Favorites Videogames</h2>
        </div>
        <div style={{width:"900px", margin: "auto"}}>
        <ul className="list-group">
            {store.favoriteVideogames.map((videogameFav, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <h5>{videogameFav.name}</h5>

            <div className="d-flex justify-content-end">

            <Link to={"/videogames/" + index}>
              <button className="btn btn-sm m-2" style={{backgroundColor: "#C3E2C2"}} >View More...</button>
            </Link>

            <button className="btn btn-lg" style={{color: "#EAECCC"}} onClick={() => handleToggleFavorite(videogameFav.id)}>
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
