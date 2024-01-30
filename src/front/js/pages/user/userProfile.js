import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const User_Profile = () => {
  const { store } = useContext(Context);
  
  return (
    <>
      <div>
        <h2>My Profile</h2>
      </div>
      <div>
        <div className="card mb-3" style={{width:"540px"}}>
          <div className="row g-0">
            <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">USER FULL NAME</h5>
                {store.user && (
                <p>
                  Logged in as: {store.user.email}
                </p>
                )}
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/viewFavVideogames/">
          <button className="btn btn-warning">My Videogames</button>
        </Link>
        <Link to="/viewFavConsoles/">
          <button className="btn btn-warning">My Consoles</button>
        </Link>
        <Link to="/viewFavGenres/">
          <button className="btn btn-warning">My Genres</button>
        </Link>
        
      </div>
    </>
  );
};