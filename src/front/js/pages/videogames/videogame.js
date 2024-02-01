import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Videogame = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

 

  return (
    <div className="px-4 py-5 text-center home">
      {store.videogames[params.theid] ? (
        <>
          <h1 className="display-5 fw-bold text-body-emphasis">{store.videogames[params.theid].name}</h1>
          <p className="lead m-4">PEGI: {store.videogames[params.theid].pegi}</p>
          <p className="lead m-4">Year: {store.videogames[params.theid].year}</p>

          <hr className="my-4" />
        </>
      ) : (
        <p>Videogame not found</p>
      )}

      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
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
      </div>
    </div>
  );
};

Videogame.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};

