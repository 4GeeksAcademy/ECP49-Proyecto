import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

export const ConsoleList = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteConsole = (console_id) => {
    actions.deleteConsole(console_id);
  };

  return (
    <div className="container">
      <ul className="list-group">
        {store.consoles == false && <p>...loading</p>}
        {store.consoles.length > 0 &&
          store.consoles.map((console, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={"/consoles/" + index} className="text-decoration-none">
                  <span>{console.name}</span>
                  <span>{console.company}</span>
                  <span>{console.year}</span>
                </Link>

                <Link
                  className="btn btn-success"
                  to={"/consoles/" + index}
                >
                  Learn More...
                </Link>



                <Link to={`/consoles/edit/${console.id}`}>
                  {store.auth === true ?
                  <button className="btn btn-primary">Edit</button>
                  : null}

                </Link>

                {store.auth === true ? 
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteConsole(console.id)}>
                  Delete
                </button>
                : null} 


              </li>
            );
          })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

      {store.auth === true ?
      <Link to="/consoles/add">
        <span className="btn btn-primary" href="#" role="button">
          Add console
        </span>
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


