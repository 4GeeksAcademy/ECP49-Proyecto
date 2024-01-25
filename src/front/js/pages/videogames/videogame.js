import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Videogame = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const handleDeleteVideogame = (videogame_id) => {
    actions.deleteVideogame(videogame_id);
  };

  return (
    <div className="jumbotron">
      {store.videogames[params.theid] ? (
        <>
          <h1 className="display-4">Name: {store.videogames[params.theid].name}</h1>
          <h1 className="display-4">PEGI: {store.videogames[params.theid].pegi}</h1>
          <h1 className="display-4">Year: {store.videogames[params.theid].year}</h1>
          <hr className="my-4" />
        </>
      ) : (
        <p>Videogame not found</p>
      )}

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
      <Link to="/videogames">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back to the list
        </span>
      </Link>
    </div>
  );
};

Videogame.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
