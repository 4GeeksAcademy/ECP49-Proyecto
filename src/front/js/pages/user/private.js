import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate()
        }, 500)
    }, [])

    return (
        <div className="container text-center">
            <h1>Hello!</h1>
            {store.user != null ?
                <div >
                    <h2>Email: {store.user.email}</h2>
                </div>
                :
                navigate("/login")
            }
            <Link to="/" className="btn btn-outline-danger">Go to Home</Link>
        </div>
    );
}

export default Private;