import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/home.css'


export const Footer = () => {
  const { store } = useContext(Context);

  return (
    <div className="container-fluid fondo_nav">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 border-top fixed-bottom fondo_nav footer_height">
        <Link to="/" className="btn btn-outline-danger">
          Go to Home
        </Link>

        {store.user && (
          <p style={{backgroundColor: "#C3E2C2"}}>
            Logged in as: {store.user.email}
          </p>
        )}
        <p style={{backgroundColor: "#C3E2C2"}}>
          Made with <i className="fa fa-heart text-danger" /> by{" "}
          <a href="http://www.4geeksacademy.com" style={{backgroundColor: "#C3E2C2"}}>4Geeks Academy, Group 49</a>
        </p>
    </footer>
    </div>
  );
};
