import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Console = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getSingleConsole(params.name);
    }, [params.name]);

    const handleUpdate2 = () => {
        actions.getSingleConsole(params.name);
    }

    return (
        <div className="jumbotron">
            {store.consoles.find(c => c.name === params.name) ? (
                <>
                    <h1 className="display-4">Name: {store.consoles[params.theid].name}</h1>
                    <h1 className="display-4">Company: {store.consoles[params.theid].company}</h1>
                    <h1 className="display-4">Year: {store.consoles[params.theid].name}</h1>
                    <button onClick={() => handleUpdate2(consoleData)}></button>
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
        </div>
    );
};

Console.propTypes = {
    name: PropTypes.string,
    company: PropTypes.string,
    year: PropTypes.number,
};

