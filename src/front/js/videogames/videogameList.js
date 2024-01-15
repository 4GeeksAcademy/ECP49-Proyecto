import React from "react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Videogame } from "../videogames/videogame";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);

  const handleButtonClick = (videogameId) => {
    actions.getSingleVideogame(videogameId);
  };

  useEffect(() => {
    actions.getVideogames();
  }, []);

  return (
    <div>
      <h1>Videogames List</h1>
      {store.videogames == false && (
        <p>Error to Upload videogames, try again my friend!</p>
      )}
      {store.videogames.map((videogames, index) => (
        <button
          onClick={() => handleButtonClick(videogames.id)}
          key={videogames.id}
        >
          <Videogame
            videogames={videogames}
            key={index}
            id={index}          
            />
        </button>
      ))}
    </div>
  );
};

VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
      {/* {store.videogames.length > 0 && */}
