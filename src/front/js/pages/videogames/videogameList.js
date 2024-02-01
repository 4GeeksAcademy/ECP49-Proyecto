import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../../styles/home.css"
import "../../../styles/buttons.css"
import "../../../styles/list.css"

import { Context } from "../../store/appContext";

export const VideogamesList = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteVideogame = (videogame_id) => {
    actions.deleteVideogame(videogame_id);
  };

  const handleToggleFavorite = (videogame_id) => {
    actions.toggleFavoriteVideogame(videogame_id);
  };

  return (
    <div className="container text-center home">
      <div>
        <h2>All Videogames</h2>
      </div>

      <div className="list">
        <ul className="list-group">
          {store.videogames === false && <p>...loading</p>}
          {store.videogames.length > 0 &&
            store.videogames.map((videogame, index) => {
              return (
                <li key={index} className="list-group-item list m-1">
                  <h5>{videogame.name}</h5>


                  <div className="d-flex justify-content-end">


                    <Link to={`/videogames/` + index}>
                      <button className="btn btn-sm m-2 btn-green">View More...</button>
                    </Link>

                    {store.auth === true ?
                      <Link to={`/videogames/edit/${videogame.id}`}>
                        <button className="btn btn-sm m-2 btn-beige">Edit</button>
                      </Link>
                      : null}

                    {store.auth === true ?
                      <button
                        className="btn btn-sm m-2 btn-red"
                        onClick={() => handleDeleteVideogame(videogame.id)}>
                        Delete
                      </button>
                      : null}


                    {store.auth === true ? null :
                      <button
                        className="btn btn-sm"
                        onClick={() => handleToggleFavorite(videogame.id)}><i className="fa-solid fa-star star-like"></i>

                      </button>
                    }

                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <br />

      {store.auth === true ?
        <Link to="/videogames/add">

          <button className="btn btn-md m-2 btn-green">Add New Videogame</button>

        </Link>
        : null}

    </div>
  );
};

VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
