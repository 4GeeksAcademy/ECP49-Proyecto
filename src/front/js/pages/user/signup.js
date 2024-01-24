import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault()
        actions.createUser(email, password) // Add USER to database.
        //actions.getToken(email, password) // Get token from backend if user is in database.
        navigate("/login")
    }

    return (
        <div className="container mt-5">
            <form>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder="Enter your email." onChange={ (event) => setEmail(event.target.value) }/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder="Enter your password." onChange={ (event) => setPassword(event.target.value) }/>
                </div>

                <button type="submit" className="btn mx-auto btn-primary" onClick={event => handleSignUp(event)}>Sign Up</button>
            </form>

        </div>
    );
};