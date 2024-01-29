import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const Consoles_Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavoriteConsoles().catch((error) => {
      console.error("Error fetching favorite consoles:", error);
    });
  }, []); 

  return (
    <>
      <div>
        <h2>Favorite Consoles</h2>
        <ul className="list-group">
  {store.favoriteConsoles.map((consoleFav, index) => (
    <li key={index}>
      <p>Console: {consoleFav.name}</p>
    </li>
  ))}
</ul>
      </div>
    </>
  );
};
