import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import '../../../styles/single.css';

export const Console = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    

    return (


        <div className="px-4 py-5 my-5 text-center">

            {store.consoles[params.theid] ? (
                <>
                    <h1 className="display-5 fw-bold text-body-emphasis">{store.consoles[params.theid].name}</h1>
                    <p className="lead m-4">Company: {store.consoles[params.theid].company}</p>
                    <p className="lead m-4">Year: {store.consoles[params.theid].year}</p>

                    <hr className="my-4" />
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
