import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import AllVideogamesImage from '/workspaces/ECP49-Proyecto/src/front/img/Videojuegos1.jpeg';

export const VideogameListContainer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="jumbotronList container">
      <div className="d-flex justify-content-center overflow row">
        <div className="col">
          {/* Card "All Videogames" */}
          <Link to={"/videogames/"} className="text-decoration-noneList2">
            <div className="card-body card-bodyList2 list-group">
            <img
            src={AllVideogamesImage}
            alt="All Videogames"
            className="card-imageList2"
          />
              <span className="card-titleList21 display-6">All Videogames</span>
            </div>
          </Link>

          {/* Cards generadas con el bucle map */}
          <ul
            className="d-flex justify-content-start list-group list-group-horizontal"
            style={{ width: '2000px', height: "200px" }}
          >
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
                      <Link to={"/videogames/" + index} className="text-decoration-none">
                        <>
                          <div className="card-body card-bodyList list-group">
                            <span className="card-titleList1">{videogame.name}</span>
                            <span className="card-titleList2">Pegi: {videogame.pegi}</span>
                            <span className="card-titleList3">Year: {videogame.year}</span>
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