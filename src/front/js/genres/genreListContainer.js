import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const GenreListContainer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="jumbotron container">
      <div className="d-flex justify-content-center overflow row">
        <div className="col">
          <Link to={"/genreslist/"} className="text-decoration-none">
            See All Genres
          </Link>
          <ul
            className="d-flex justify-content-start list-group list-group-horizontal"
            style={{ width: '2000px', height: "200px" }}
          >
            {!store.genres || store.genres.length === 0 ? (
              <p>...loading</p>
            ) : (
              store.genres.map((genre, index) => (
                <span key={index} className="">
                  <Link to={"/genres/" + index} className="text-decoration-none">
                    <>
                      <div className="card-body list-group">
                        <span className="card-title">Name: {genre.type}</span>
                        <Link
                          className="btn btn-success"
                          to={'/genres/' + index}
                        >
                          Learn More...
                        </Link>
                      </div>
                    </>
                  </Link>
                </span>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
