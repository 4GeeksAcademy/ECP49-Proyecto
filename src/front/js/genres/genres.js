import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();


	return (
		<div className="px-4 py-5 my-5 text-center">
      {store.genres[params.theid] ? (
        <>
          <h1 className="display-5 fw-bold text-body-emphasis">{store.genres[params.theid].type}</h1>
          <hr className="my-4" />
        </>
      ) : (
        <p>Genre not found</p>
      )}

      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/">
            <span className="btn btn-primary btn-lg" href="#" role="button">
              Back home
            </span>
          </Link>
          <Link to="/genresList">
            <span className="btn btn-primary btn-lg" href="#" role="button">
              BackList
            </span>
          </Link>
        </div>
      </div>
    </div>
	);
};

Genres.propTypes = {
	match: PropTypes.object,
	id: PropTypes.number,
	type: PropTypes.string
};
