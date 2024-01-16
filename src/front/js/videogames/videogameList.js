import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Videogame } from "./videogame";

import { Context } from "../store/appContext";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
	  {store.videogames == false && (
         <p>...loading</p>
       )}
        {store.videogames.length > 0 &&
          store.videogames.map((item, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={"/videogames/" + index} className="text-decoration-none">
                  <span>{item.name}</span>
                  <span>{item.pegi}</span>
                  <span>{item.year}</span>
                </Link>

                <Link
                  className="btn btn-success"
                  to={'/videogames/' + index}
                >
                  Learn More...
                </Link>
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
