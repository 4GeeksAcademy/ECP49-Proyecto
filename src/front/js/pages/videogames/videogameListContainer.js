import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import '../../../styles/videogames.css';

export const VideogameListContainer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();


  return (
    <div className="jumbotron container">
      <div className="d-flex justify-content-center overflow row">
        <div className="col">
          <Link to={"/videogames/"} className="text-decoration-none" >
            See All Videogames
          </Link>
          <ul className="d-flex justify-content-start list-group list-group-horizontal" style={{ width: '2000px', height: "200px" }}>
            {store.videogames == false && (
              <p>...loading</p>
            )}
            {store.videogames.length > 0 &&
              store.videogames.map((videogame, index) => {
                return (
                  <>
                    <span
                      key={index}
                      className=''
                    >
                      <Link to={"/videogames/" + index} className="text-decoration-none" >
                        <>
                          <div className="card-body list-group" >
                            <span className="card-title">Name: {videogame.name}</span>
                            <span className="card-title">Pegi: {videogame.pegi}</span>
                            <span className="card-title">Year: {videogame.year}</span>
                            <Link
                              className="btn btn-success"
                              to={'/videogames/' + index}
                            >
                              Learn More...
                            </Link>
                          </div>
                        </>
                      </Link>
                    </span>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};



// window.location.href = `/videogames/edit/${videogame.id}`;
// window.location.reload() = `/videogames/edit/${videogame.id}`;
