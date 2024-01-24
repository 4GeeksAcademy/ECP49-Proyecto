import React, { useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useParams } from 'react-router-dom';

export const EditVideogame = ({ id }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(store.videogames[id].name);
  const [pegi, setPegi] = useState(store.videogames[id].pegi);
  const [year, setYear] = useState(store.videogames[id].year);


  const handleToggleForm = () => {
    setShowForm(!showForm);

    const videogame = store.videogames[id];
    if (!videogame) {
      setName('');
      setPegi('');
      setYear('');
      return;
    }

    name = videogame.name;
    pegi = videogame.pegi;
    year = videogame.year;
  };

  const handleInputChangeName = (e) => {
    const { name } = e.target;
    setName(name);
  };

  const handleInputChangePegi = (e) => {
    const { name } = e.target;
    setPegi(name);
  };

  const handleInputChangeYear = (e) => {
    const { name } = e.target;
    setYear(name);
  };

  const editVideogame = () => {
    const updatedVideogame = {
      name,
      pegi,
      year,
    };
    actions.editVideogame(updatedVideogame);
    setName('');
    setPegi('');
    setYear('');
    setShowForm(false);
  };

  if (id) {
    const videogame = store.videogames[id];
    if (!videogame) {
      setName('');
      setPegi('');
      setYear('');
      return;
    }

    name = videogame.name;
    pegi = videogame.pegi;
    year = videogame.year;
  }

  return (
    <div className="edit-videogame">
      <button
        onClick={handleToggleForm}
        className="btn btn-primary"
      >
        Edit
      </button>
      {showForm ? (
        <form onSubmit={editVideogame}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChangeName}
            className="form-control"
          />

          <label htmlFor="pegi">Pegi:</label>
          <input
            type="number"
            name="pegi"
            value={pegi}
            onChange={handleInputChangePegi}
            className="form-control"
          />

          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            value={year}
            onChange={handleInputChangeYear}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      ) : null}
    </div>
  );
};

export default EditVideogame;


// import React, { useContext, useState } from "react";
// import { Context } from "../store/appContext";
// import PropTypes from "prop-types";

// export const EditVideogame = () => {
//   const { actions } = useContext(Context);
//   const [name, setName] = useState("");
//   const [pegi, setPegi] = useState("");
//   const [year, setYear] = useState("");
//   const [contactLink, setcontactLink] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       setName(value);
//     } else if (name === "pegi") {
//       setPegi(value);
//     } else if (name === "year") {
//       setYear(value);
//     }
//   };

//   const editVideogames = () => {
//     const editVideogame = {
//       name: name,
//       pegi: pegi,
//       year: year,
//     };
//     setcontactLink(editVideogame);
//     actions.editVideogame(editVideogame);
//     // deleteHandleInputChange();
//     // window.location.reload()
//     console.log("Videogame edited JSON:", editVideogame);
//   };

//   const deleteHandleInputChange = () => {
//     setName("");
//     setPegi("");
//     setYear("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       editVideogames();
//     }
//   };
//   return (
//     <div>
//       <h2>Edit Videogame</h2>
//       <form>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={handleInputChange}
//           className="form-control"
//           onKeyDown={handleKeyPress}
//         />
//         <br />

//         <label htmlFor="pegi">PEGI:</label>
//         <input
//           type="number"
//           name="pegi"
//           value={pegi}
//           onChange={handleInputChange}
//           className="form-control"
//           onKeyDown={handleKeyPress}
//         />
//         <br />

//         <label htmlFor="year">Year:</label>
//         <input
//           type="number"
//           name="year"
//           value={year}
//           onChange={handleInputChange}
//           className="form-control"
//           onKeyDown={handleKeyPress}
//         />
//         <br />

//         <button
//           type="button"
//           onClick={editVideogames}
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//         <button
//           type="button"
//           onClick={deleteHandleInputChange}
//           className="btn btn-primary"
//         >
//           Delete Videogame
//         </button>
//       </form>
//     </div>
//   );
// };


// EditVideogame.propTypes = {
//   name: PropTypes.string,
//   pegi: PropTypes.number,
//   year: PropTypes.number,
// };
