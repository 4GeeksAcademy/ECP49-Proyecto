import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";


export const User_Profile = () => {
  const { store } = useContext(Context);
  
  return (
    <>
    <div className="container text-center">
      <div>
        <h2>My Profile</h2>
      </div>
      
        <div className="card mb-3" style={{width:"540px", margin: "auto"}}>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center" style={{backgroundColor: "#DBCC95"}}>
              <div>
                <img src="https://picsum.photos/100" className="img-fluid rounded-circle" alt="..."/>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">USER FULL NAME</h5>
                {store.user && (
                <p>
                  Email: {store.user.email}
                </p>
                )}
                
              </div>
              <div style={{ display: "flex", justifyContent:"space-between", margin:"auto"}}>
        <Link to="/viewFavVideogames/">
          <button className="btn btn-sm m-2" style={{backgroundColor: "#C3E2C2"}}>My Videogames</button>
        </Link>
        <Link to="/viewFavConsoles/">
          <button className="btn btn-sm m-2" style={{backgroundColor: "#C3E2C2"}}>My Consoles</button>
        </Link>
        <Link to="/viewFavGenres/">
          <button className="btn btn-sm m-2" style={{backgroundColor: "#C3E2C2"}}>My Genres</button>
        </Link>
        </div> 
            </div>
          </div>
        </div>
        
    </div>
    </>
  );
};