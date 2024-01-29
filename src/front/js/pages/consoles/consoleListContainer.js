import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import '../../../styles/listContainers.css';


export const ConsoleListContainer = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
  
    return (
      <div className="jumbotron jumbotronList container">
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
                        <div className="card-body card-bodyList  list-group">
                          <span className="card-titleList1">Name: {console.name}</span>
                          <span className="card-titleList2">Company: {console.company}</span>
                          <span className="card-titleList3">Year: {console.year}</span>
                          <Link
                            className="btn btn-success moreinfo"
                            to={'/consoles/' + index}
                          >
                            More info
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