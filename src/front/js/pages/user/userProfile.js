import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.css"
import "../../../styles/buttons.css"
import "../../../styles/userProfile.css"


export const User_Profile = () => {
  const { store } = useContext(Context);
  
  return (
    <>
    <div className="container text-center home">
      <div>
        <h2>My Profile</h2>
      </div>
      
        <div className="card mb-3 user-profile">
          <div className="row g-0">
            <div className="col-md-4 user-image">
              <div>
                <img src="https://picsum.photos/100" className="img-fluid rounded-circle" alt="..."/>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title"></h5>
                {store.user && (
                <h5>
                  Email: {store.user.email}
                </h5>
                )}
                
              </div>
              <div className="btn-profile">
        <Link to="/viewFavVideogames/">
          <button className="btn btn-sm m-2 btn-green">My Videogames</button>
        </Link>
        <Link to="/viewFavConsoles/">
          <button className="btn btn-sm m-2 btn-green">My Consoles</button>
        </Link>
        <Link to="/viewFavGenres/">
          <button className="btn btn-sm m-2 btn-green">My Genres</button>
        </Link>
        </div> 
            </div>
          </div>
        </div>
        
    </div>
    </>
  );
};