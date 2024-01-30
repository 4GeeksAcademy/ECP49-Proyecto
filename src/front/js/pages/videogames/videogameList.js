import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    <div className="container text-center">
      <div>
        <h2>All Videogames</h2>
      </div>
      <div style={{width:"900px", margin: "auto"}}>
      <ul className="list-group">
        {store.videogames === false && <p>...loading</p>}
        {store.videogames.length > 0 &&
          store.videogames.map((videogame, index) => {
            return (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <h5>{videogame.name}</h5>

                <div className="d-flex justify-content-end">

                <Link to={`/videogames/` + index}>
                <button className="btn btn-sm m-2" style={{backgroundColor: "#C3E2C2"}} >View More...</button>
                </Link>

                {store.auth === true ?
                  <Link to={`/videogames/edit/${videogame.id}`}>
                    <button className="btn btn-sm m-2" style={{backgroundColor: "#DBCC95"}}>Edit</button>
                  </Link>
                  : null}

                {store.auth === true ?
                  <button
                    className="btn btn-sm m-2" style={{backgroundColor: "#CD8D7A"}}
                    onClick={() => handleDeleteVideogame(videogame.id)}>
                    Delete
                  </button>
                  : null}

<button
  className="btn btn-lg" style={{color: "#EAECCC"}}
  onClick={() => handleToggleFavorite(videogame.id)}><i class="fa-solid fa-star"></i>
  
</button>
                  </div>
              </li>
            );
          })}
      </ul>
      </div>
      <br />

      {store.auth === true ?
        <Link to="/videogames/add">
          <button className="btn btn-md" style={{backgroundColor: "#C3E2C2"}} >Add New Videogame</button>
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
