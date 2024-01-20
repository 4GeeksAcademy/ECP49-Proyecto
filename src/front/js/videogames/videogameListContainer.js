import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { VideogamesList } from './videogameList';

export const VideogameListContainer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();



  return (
    <div className="jumbotron">
    <div className="d-flex justify-content-center">
        <div className="d-flex cardDisplay overflow" style={{ width: '2000px', height:"300px" }} >
                <VideogamesList />
        </div>
      </div>
    </div>
  );
};



// window.location.href = `/videogames/edit/${videogame.id}`;
// window.location.reload() = `/videogames/edit/${videogame.id}`;
