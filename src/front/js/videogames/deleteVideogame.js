import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const VideogameDelete = () => {
  const { store, actions } = useContext(Context);
  const handleDelete = (videogameId) => {
    actions.deleteVideogame(videogameId);
  };

  const handleCancel = () => {
    actions.getVideogames();
  };

  const videogame = store.videogames.find(videogame => videogame.id === parseInt(videogameId));

  return (
    <div>
      <h2>Delete Videogame</h2>
      <p>Are you sure you want to delete the videogame "{videogame.name}"?</p>
      <button onClick={() => handleDelete(videogameId)}>Delete</button>
      <button onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};

export default VideogameDelete;