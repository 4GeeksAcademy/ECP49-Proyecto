import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

const VideogameEdit = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [videogameData, setVideogameData] = useState({
    name: "",
    pegi: "", 
    year: "", 
  });

  useEffect(() => {
    actions.getSingleVideogame(params.theid).then((videogame) => {
      setVideogameData({
        name: videogame.name,
        pegi: videogame.pegi,
        year: videogame.year,
      });
    });
  }, [params.theid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideogameData((prevVideogameData) => ({
      ...prevVideogameData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    actions.updateVideogame(params.theid, videogameData);
  };

  return (
    <div>
      <h2>Edit Videogame</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={videogameData.name}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="pegi">PEGI:</label>
        <input
          type="number" // Cambiado a type "number"
          name="pegi"
          value={videogameData.pegi}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="year">Year:</label>
        <input
          type="number" // Cambiado a type "number"
          name="year"
          value={videogameData.year}
          onChange={handleInputChange}
          className="form-control"
        />

        <button type="button" onClick={handleUpdate} className="btn btn-primary">
          Update Videogame
        </button>
      </form>
    </div>
  );
};

export default VideogameEdit;
