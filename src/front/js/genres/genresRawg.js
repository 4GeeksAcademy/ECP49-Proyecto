import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const GenresRawg = () => {
    const [selectedGenre, setselectedGenre] = useState(null);
    const { genresId } = useParams();

    useEffect(() => {
        const fetchRawgData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/genres/${genresId}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
                const data = await response.json();

                // Verificar si hay resultados y seleccionar el juego
                if (data) {
                    setselectedGenre(data);
                }
            } catch (error) {
                console.error("Error fetching data from RAWG API:", error);
            }
        };

        fetchRawgData();
    }, [genresId]);

    return (
        <>
            <div className="card" style={{maxWidth: "18rem"}}>
                {selectedGenre ? (

                    <>
                        <img className="img-thumbnail" style={{ maxheight: "150px", bottom: "0px" }} src={selectedGenre.background_image} alt="Card image cap" />

                        <div className="card text-center">

                            <div className="card-header">
                                <h2>{selectedGenre.name}</h2>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                </h5>
                                <p className="card-text">Games Count: {selectedGenre.games_count || "Unknown"}</p>
                                <p className="card-text">Description: {selectedGenre.description || "Not defined"}</p>
                            </div>
                            <div className="card-footer text-muted">
                                <h2>{selectedGenre.name}</h2>
                            </div>

                        </div>
                    </>

                ) : (
                    <h2>No genre selected</h2>
                )}

            </div>
        </>
    );
};