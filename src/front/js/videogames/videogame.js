import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

export const Videogame = ({ id }) => {
  const { store, actions } = useContext(Context);

  const [videogame, setVideogame] = useState(null);

   const fetchVideogame = async () => {
     const response = await fetch(`https://stunning-xylophone-g7rqpr794wxhv479-3001.app.github.dev/api/videogames/2`);
     // const response = await fetch(`https://stunning-xylophone-g7rqpr794wxhv479-3001.app.github.dev/api/videogames/${id}`);
     const videogameData = await response.json();
     setVideogame(videogameData);
   };

  useEffect(() => {
    fetchVideogame();
  }, [id]);

   if (!videogame) {
     return <p>Loading...</p>;
   }
  //  const handleUpdate = () => {
  //    actions.getSingleVideogame(videogameData.id);
  //  }
  //  const handleDelete = () => {
  //    alert("Delete button clicked");
  //  };
  //  useEffect(() => {
  //    // actions.getVideogames();
  //    actions.getSingleVideogame();
  //  }, []);

    return (
      <>
        <div key={videogame.id}>
          <h2>{videogame.name}</h2>
          <p>Pegi: {videogame.pegi}</p>
          <p>Year: {videogame.year}</p>
        </div>
        {/* <button onClick={() => handleUpdate(videogame)}>Update</button>  */}
        {/* <button onClick={() => handleCancel()}>Cancel</button> */}
      </>
    );
  };
  

// Videogame.propTypes = {
//   id: PropTypes.number.isRequired,
//  };
