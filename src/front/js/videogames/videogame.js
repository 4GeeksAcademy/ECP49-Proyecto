import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Videogame = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [name, setName] = useState("");
  const [pegi, setPegi] = useState("");
  const [year, setYear] = useState("");
  const [videogameLink, setVideogameLink] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  const handleToggleForm1 = () => {
    setShowForm1(!showForm1);
  };
  const handleToggleForm2 = () => {
    setShowForm2(!showForm2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "pegi") {
      setPegi(value);
    } else if (name === "year") {
      setYear(value);
    }
  };
  const editVideogame = () => {
    const editVideogame = {
      name: name,
      pegi: pegi,
      year: year,
    };
    setVideogameLink(editVideogame);
    actions.editVideogame(editVideogame);
    // deleteHandleInputChange();
    console.log("edited:", editVideogame);
    setShowForm(false);
    setShowForm1(false);
    setShowForm2(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editVideogame();
    }
  };

  // const handleDeleteVideogame = async (id) => {
  //   try {
  //     await actions.deleteVideogame(id);

  //     // Redirect to the videogames list
  //     // window.location.href = '/videogames';
  //   } catch (error) {
  //     videogame.error('Error deleting videogame from backend', error);
  //   }
  // };

  const videogame = store.videogames[params.theid];

  return (
    <div className="jumbotron">
      {store.videogames[params.theid] ? (
        <>
          <h1 className="display-4">Name: {store.videogames[params.theid].name}<button
            onClick={handleToggleForm}
            className="btn btn-primary"
          >
            Edit
          </button></h1>
          {showForm ? (
            <>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
                onKeyDown={handleKeyPress}
              />
            </>
          ) : null}

          <h1 className="display-4">Pegi: {store.videogames[params.theid].pegi}<button
            onClick={handleToggleForm1}
            className="btn btn-primary"
          >
            Edit
          </button></h1>
          {showForm1 ? (
            <>
              <label htmlFor="name">Pegi:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
                onKeyDown={handleKeyPress}
              />
            </>
          ) : null}
          <h1 className="display-4">Year: {store.videogames[params.theid].year}<button
            onClick={handleToggleForm2}
            className="btn btn-primary"
          >
            Edit
          </button></h1>
          {showForm2 ? (
            <>
              <label htmlFor="name">Year:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
                onKeyDown={handleKeyPress}
              />
            </>
          ) : null}
          <hr className="my-4" />
        </>
      ) : (
        <p>videogame not found</p>
      )}

      {/* <button onClick={() => handleUpdate(videogame)}>Edit</button> */}

      <button
        onClick={() => {
          handleDeleteVideogame(videogame.id);
        }}
        className="btn btn-danger"
      >
        Delete
      </button>

      <hr className="my-4" />

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
      <Link to="/videogames">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back to the list
        </span>
      </Link>
    </div>
  );
};

Videogame.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};


// window.location.href = `/videogames/edit/${videogame.id}`;
// window.location.reload() = `/videogames/edit/${videogame.id}`;
