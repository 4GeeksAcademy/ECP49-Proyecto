import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Console = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const handleDeleteConsole = (console_id) => {
        actions.deleteConsole(console_id);
    };

    return (
        <div className="jumbotron">
            {store.consoles[params.theid] ? (
                <>
                    <h1 className="display-4">Name: {store.consoles[params.theid].name}</h1>
                    <h1 className="display-4">Company: {store.consoles[params.theid].company}</h1>
                    <h1 className="display-4">Year: {store.consoles[params.theid].year}</h1>
                    <hr className="my-4" />
                </>
            ) : (
                <p>Console not found</p>
            )}

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

            <Link to="/consoles/add">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Add console
                </span>
            </Link>


            <button
                className="btn btn-danger"
                onClick={() => handleDeleteConsole(store.consoles[params.theid].id)}
            >
                Delete
            </button>

            

        </div>
    );
};

Console.propTypes = {
    name: PropTypes.string,
    company: PropTypes.string,
    year: PropTypes.number,
};
