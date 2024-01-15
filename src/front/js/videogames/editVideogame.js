import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const VideogameEdit = () => {
  const { store, actions } = useContext(Context);
  const handleUpdate = (videogameData) => {
    actions.updateVideogame(videogameData);
  };

  const handleCancel = () => {
    actions.getVideogames();
  };

  // const videogame = store.videogames.find(videogame => videogame.id === parseInt(videogameId));

  return (
    <div>
      <h2>Edit Videogame</h2>
      <form>
        <label>Name:</label>
        <input type="text" value={videogame.name} onChange={(event) => videogame.name = event.target.value} />
        <br />

        <label>PEGI:</label>
        <input type="number" value={videogame.pegi} onChange={(event) => videogame.pegi = parseInt(event.target.value)} />
        <br />

        <label>Year:</label>
        <input type="number" value={videogame.year} onChange={(event) => videogame.year = parseInt(event.target.value)} />
        <br />

        <button onClick={() => handleUpdate(videogame)}>Update</button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </form>
    </div>
  );
};

export default VideogameEdit;