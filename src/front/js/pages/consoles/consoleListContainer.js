import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';


export const ConsoleListContainer = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
  
    return (
      <div className="jumbotron container">
        <div className="d-flex justify-content-center overflow row">
          <div className="col">
            <Link to={"/Consoles/"} className="text-decoration-none">
              See All Consoles
            </Link>
            <ul
              className="d-flex justify-content-start list-group list-group-horizontal"
              style={{ width: '2000px', height: "200px" }}
            >
              {!store.consoles || store.consoles.length === 0 ? (
                <p>...loading</p>
              ) : (
                store.consoles.map((console, index) => (
                  <span key={index} className="">
                    <Link to={"/consoles/" + index} className="text-decoration-none">
                      <>
                        <div className="card-body list-group">
                          <span className="card-title">Name: {console.name}</span>
                          <span className="card-title">Company: {console.company}</span>
                          <span className="card-title">Year: {console.year}</span>
                          <Link
                            className="btn btn-success"
                            to={'/consoles/' + index}
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