import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store } = useContext(Context);

  return (
    <footer className="footer mt-auto py-3 text-center">
      <p>
        Made with <i className="fa fa-heart text-danger" /> by{" "}
        <a href="http://www.4geeksacademy.com">4Geeks Academy</a>
      </p>
      {store.user && (
        <p>
          Logged in as: {store.user.email}
        </p>
      )}
      <Link to="/" className="btn btn-outline-danger">
        Go to Home
      </Link>
    </footer>
  );
};
