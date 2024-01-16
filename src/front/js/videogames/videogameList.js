import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);
  // const {videogames, setVideogames} = useState()

  useEffect(() => {
    console.log(actions.getVideogames());
    console.log(store.videogames);
  }, []);

  return (
    <div className="container">
      <ul className="list-group">
	  {store.videogames == false && (
         <p>Error to Upload videogames, try again my friend!</p>
       )}
        {store.videogames.length > 0 &&
          store.videogames.map((item, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={"/videogames/" + index}>
                  <span>Link to: {item.name}</span>
                  <span>Link to: {item.pegi}</span>
                  <span>Link to: {item.year}</span>
                </Link>

                <button
                  className="btn btn-success"
                  onClick={() => actions.getVideogames(index)}
                >
                  Change Color
                </button>
              </li>
            );
          })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
