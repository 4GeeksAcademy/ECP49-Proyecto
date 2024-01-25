import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteVideogame = (videogame_id) => {
    actions.deleteVideogame(videogame_id);
  };

  return (
    <div className="container">
      <ul className="list-group">
        {store.videogames === false && <p>...loading</p>}
        {store.videogames.length > 0 &&
          store.videogames.map((videogame, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={`/videogames/${videogame.id}`} className="text-decoration-none">
                  <span>{videogame.name}</span>
                  <span>{videogame.pegi}</span>
                  <span>{videogame.year}</span>
                </Link>

                <Link to={`/videogames/${videogame.id}`}>
                  <button className="btn btn-success">Learn More...</button>
                </Link>

                <Link to={`/videogames/edit/${videogame.id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteVideogame(videogame.id)}>
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

      <Link to="/videogames/add">
        <span className="btn btn-primary" href="#" role="button">
          Add videogame
        </span>
      </Link>
    </div>
  );
};

VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
