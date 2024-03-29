import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import '../../../styles/single.css';

export const Console = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [selectedConsole, setselectedConsole] = useState(null);
    const { theid } = useParams();

    useEffect(() => {
        const fetchRawgData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/platforms?key=e8722d91c21d4eec9047a9a02fd9efe7`);
                const data = await response.json();

                if (data) {
                    setselectedConsole(data);
                }
            } catch (error) {
                console.error("Error fetching data from RAWG API:", error);
            }
        };

        fetchRawgData();
    }, [theid]);


    return (


        <div className="px-4 py-5 mx-5 text-center card fondo">
            {store.consoles[params.theid] ? (
                <>
                    <h1 className="display-5 fw-bold text-body-emphasis">{store.consoles[params.theid].name}</h1>
                    <hr className="my-4" />
                    <div className="row justify-content-around align-items-center">
                        {/* <div className="col-2">
                            <img className="img-thumbnail" style={{ maxWidth: "350px" }} src={selectedConsole.image_background} alt="Card image cap" />
                        </div> */}
                        <div className="col-8">
                            {/* <p className="card-body mx-4"><strong>Description:</strong> {selectedConsole.description || "Not defined"}</p> */}
                            <p className="lead m-4"><strong>Company:</strong> {store.consoles[params.theid].company}</p>
                            <p className="lead m-4 card-hearder">Year: {store.consoles[params.theid].year}</p>

                        </div>
                        <hr className="my-4" />

                        <div className="card-footer text-muted fondo">
                            <h2>{selectedConsole.name}</h2>
                        </div>
                    </div>
                </>
            ) : (
                <p>Console not found</p>
            )}

            <div className="col-lg-6 mx-auto">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/">
                        <span className="btn btn-primary btn-lg" href="#" role="button">
                            Back home
                        </span>
                    </Link>
                    <Link to="/consoles">
                        <span className="btn btn-primary btn-lg" href="#" role="button">
                            Back to the list
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};



Console.propTypes = {
    name: PropTypes.string,
    company: PropTypes.string,
    year: PropTypes.number,
};
