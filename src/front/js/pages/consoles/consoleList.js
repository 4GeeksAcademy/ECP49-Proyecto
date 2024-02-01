// En ConsoleList.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../../styles/home.css"
import "../../../styles/buttons.css"
import "../../../styles/list.css"

import { Context } from "../../store/appContext";

export const ConsoleList = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteConsole = (console_id) => {
    actions.deleteConsole(console_id);
  };

  const handleToggleFavorite = (console_id) => {
    actions.toggleFavoriteConsole(console_id);
  };

  return (
    <div className="container text-center home">
      <div>
        <h2>All Consoles</h2>
      </div>


      <div className="list">
      <ul className="list-group">
        {store.consoles == false && <p>...loading</p>}
        {store.consoles.length > 0 &&
          store.consoles.map((console, index) => {
            return (
              <li key={index} className="list-group-item list m-1">
                <h5>{console.name}</h5>
                <div className="d-flex justify-content-end">
                <Link to={"/consoles/" + index}>
                  <button className="btn btn-sm m-2 btn-green">View More...</button>
                </Link>

                {store.auth === true ?
                  <Link to={`/consoles/edit/${console.id}`}>
                    <button className="btn btn-sm m-2 btn-beige">Edit</button>
                  </Link>
                  : null}

                {store.auth === true ?
                  <button
                    className="btn btn-sm m-2 btn-red"
                    onClick={() => handleDeleteConsole(console.id)}>
                    Delete
                  </button>
                  : null}


                    {store.auth === true ? null :
                      <button
                        className="btn btn-lg" style={{ color: "#EAECCC" }}
                        onClick={() => handleToggleFavorite(console.id)}><i className="fa-solid fa-star star-like"></i>
                      </button>
                    }

                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <br />

      {store.auth === true ?
        <Link to="/consoles/add">

          <button className="btn btn-md m-2 btn-green">Add New Console</button>

        </Link>
        : null}

    </div>
  );
};

ConsoleList.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  year: PropTypes.number,
};
