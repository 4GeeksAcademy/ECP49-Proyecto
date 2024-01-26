import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Game = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
        const data = await response.json();

        // Verificar si hay resultados y seleccionar el juego
        if (data) {
          setSelectedGame(data);
        }
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      }
    };

    fetchRawgData();
  }, [gameId]);

  return (
    <>
      <div className="">
        {selectedGame ? (
          <>
            <h2>{selectedGame.name}</h2>
            <p>Description: {selectedGame.description || "No description available"}</p>
            {/* <p>Released: {selectedGame.released || "Unknown"}</p> */}
            {/* <p>Rating: {selectedGame.rating || "Not rated"}</p> */}
            {/* Puedes agregar más información según la estructura de datos de la API */}
          </>
        ) : (
          <h2>No game selected</h2>
        )}
      </div>
    </>
  );
};