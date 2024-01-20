import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../../styles/videogames.css'
import { Context } from "../store/appContext";
import { FormVideogame } from "./formVideogame";

export const VideogamesList = ({ videogame }) => {
  const { store, actions } = useContext(Context);

  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleUpdate = (videogame) => {
    // Update the videogame in the store
    actions.updateVideogame(videogame);

    // Hide the form
    setShowForm(false);
  };
  return (
    <div className="container">
      <div className="">
        <div className="d-flex overflow">
          <ul className="list-group list-group-horizontal" >
            {store.videogames == false && (
              <p>...loading</p>
            )}
            {store.videogames.length > 0 &&
              store.videogames.map((videogame, index) => {
                return (
                  <>
                  <li
                    key={index}
                  >
                    <Link to={"/videogames/" + index} className="text-decoration-none" >
                      <>
                        <div className="card" style={{ width: '18em', height: '200px' }}>
                          <div className="card-body list-group ">
                            <span className="card-title">Name: {videogame.name}</span>
                            <span className="card-title">Pegi: {videogame.pegi}</span>
                            <span className="card-title">Year: {videogame.year}</span>
                            <Link
                              className="btn btn-success"
                              to={'/videogames/' + index}
                            >
                              Learn More...
                            </Link>
                          </div>
                        </div>
                      </>
                    </Link>
                  </li>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
      <br />
      <button onClick={handleToggleForm}>Add New Videogame</button>
      {showForm ? (
        <FormVideogame
          videogame={videogame}
          onUpdate={handleUpdate}
          onCancel={() => setShowForm(false)}
        />
      ) : null}
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};
