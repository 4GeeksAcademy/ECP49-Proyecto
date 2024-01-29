import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const ConsoleRawg = () => {
    const [selectedConsole, setselectedConsole] = useState(null);
    const { platformId } = useParams();

    useEffect(() => {
        const fetchRawgData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/platforms/${platformId}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
                const data = await response.json();

                // Verificar si hay resultados y seleccionar el juego
                if (data) {
                    setselectedConsole(data);
                }
            } catch (error) {
                console.error("Error fetching data from RAWG API:", error);
            }
        };

        fetchRawgData();
    }, [platformId]);

    return (
        <>
            <div className="card" style={{ maxWidth: "18rem" }}>
                {selectedConsole ? (

                    <>
                        <img className="img-thumbnail" style={{ maxheight: "150px", bottom: "0px" }} src={selectedConsole.image_background} alt="Card image cap" />

                        <div className="card text-center">

                            <div className="card-header">
                                <h2>{selectedConsole.name}</h2>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                </h5>
                                <p className="card-text">Year Start: {selectedConsole.year_start || "Unknown"}</p>
                                <p className="card-text">Year End: {selectedConsole.year_end || "Unknown"}</p>
                                <p className="card-text">Description: {selectedConsole.description || "Not defined"}</p>
                            </div>
                            <div className="card-footer text-muted">
                                <h2>{selectedConsole.name}</h2>
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