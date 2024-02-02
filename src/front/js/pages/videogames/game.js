import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const GameRawg = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const { gameId } = useParams();

    useEffect(() => {
        const fetchRawgData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
                const data = await response.json();

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
            <div className="container card my-2" style={{maxWidth: "18rem"}}>
                {selectedGame ? (

                    <>
                        <img className="img-thumbnail" style={{ maxheight: "150px", bottom: "0px" }} src={selectedGame.background_image} alt="Card image cap" />

                        <div className="card text-center">

                            <div className="card-header">
                                <h2>{selectedGame.name}</h2>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                </h5>
                                <p className="card-text">Year: {selectedGame.released || "Unknown"}</p>
                                <p className="card-text">Pegi: {selectedGame.pegi || "Not defined"}</p>
                            </div>
                            <div className="card-footer text-muted">
                                <h2>{selectedGame.name}</h2>
                            </div>

                        </div>
                    </>

                ) : (
                    <h2>No game selected</h2>
                )}

            </div>
        </>
    );
};