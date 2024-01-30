import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/listContainers.css';
import AllGenresImage from '/workspaces/ECP49-Proyecto/src/front/img/Generos1.jpeg';

export const GenreListContainer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="jumbotronList container">
      <div className="d-flex justify-content-center overflow row">
        <div className="col">
          {/* Card "All Genres" */}
          <Link to={"/genreslist/"} className="text-decoration-noneList2">
            <div className="card-body card-bodyList2 list-group">
            <img
            src={AllGenresImage}
            alt="All Genres"
            className="card-imageList2"
          />
              <span className="card-titleList21 display-6">All Genres</span>
            </div>
          </Link>

          {/* Cards generadas con el bucle map */}
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
                      <div className="card-body card-bodyList list-group">
                        <span className="card-titleList1">{genre.type}</span>
                        {/* <Link
                          className="btn btn-success"
                          to={'/genres/' + index}
                        >
                          Learn More...
                        </Link> */}
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