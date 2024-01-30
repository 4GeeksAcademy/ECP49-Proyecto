import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store } = useContext(Context);

  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 mx-4 w-75 border-top">
        <Link to="/" className="btn btn-outline-danger">
          Go to Home
        </Link>

        {store.user && (
          <p>
            Logged in as: {store.user.email}
          </p>
        )}
        <p>
          Made with <i className="fa fa-heart text-danger" /> by{" "}
          <a href="http://www.4geeksacademy.com">4Geeks Academy, Group 49</a>
        </p>
    </footer>
  );
};
