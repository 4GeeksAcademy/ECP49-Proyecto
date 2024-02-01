import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import "../../../styles/home.css"
import "../../../styles/buttons.css"
import "../../../styles/list.css"

export const Consoles_Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteConsoles().catch((error) => {
      console.error("Error fetching favorite consoles:", error);
    });
  }, []); 

  const handleToggleFavorite = (console_id) => {
    actions.toggleFavoriteConsole(console_id);
    actions.getFavoriteConsoles();
  };

  return (
    <>
       <div className="home">
        <div className="container text-center">
        <h2>My Favorites Consoles</h2>
        </div>
        <div className="list">
        <ul className="list-group">
          {store.favoriteConsoles.map((consoleFav, index) => (
            <li key={index} className="list-group-item list m-1">
              <h5>{consoleFav.name}</h5>

            <div className="d-flex justify-content-end">

            <Link to={"/consoles/" + index}>
              <button className="btn btn-sm m-2 btn-green">View More...</button>
            </Link>

            <button className="btn btn-lg" style={{color: "#EAECCC"}} onClick={() => handleToggleFavorite(consoleFav.id)}>
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