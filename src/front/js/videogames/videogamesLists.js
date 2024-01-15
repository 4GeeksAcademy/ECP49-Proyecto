import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);
  const [videogames, setVideogames] = useState([]);

  useEffect(() => {
    actions.getVideogames();
  });

  return (
    <div>
      <h1>Videogames List</h1>
      {store.videogames == false && (
        <p>Error to Upload videogames, try again my friend!</p>
      )}
      {store.videogames.length > 0 &&
        store.videogames.map((videogames) => (
          <div>
            <div key={videogames.id}>
              <h2>{videogames.name}</h2>
              <p>{videogames.pegi}</p>
              <p>{videogames.year}</p>
            </div>
          </div>
        ))}
    </div>
  );
};