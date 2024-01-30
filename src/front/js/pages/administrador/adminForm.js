import React, { useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import '../../../styles/adminForm.css';

const AdminForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        actions.loginadmin(email, password);
    };

    return (

<div class="container text-center">
  <div class="row align-items-start">
    <div class="col">
      
    </div>
    <div class="col">
    <div>
            {store.auth === true ? <Navigate to="/" /> : ""}

            <div className="container mt-5">
                <form className="new-form-control">
                    <p className="new-title">Login ADMIN</p>
                    <div className="new-input-field">
                        <input
                            required=""
                            className="new-input"
                            type="text"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <label className="new-label" htmlFor="email">
                            Enter Email
                        </label>
                    </div>
                    <div className="new-input-field">
                        <input
                            required=""
                            className="new-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <label className="new-label" htmlFor="password">
                            Enter Password
                        </label>
                    </div>

                    <button
                        className="new-submit-btn"
                        type="button"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="col">
      
    </div>
  </div>
</div>

        
    );
};

export default AdminForm;
