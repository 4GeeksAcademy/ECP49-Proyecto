import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";

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
        actions.loginadmin(email, password)

    };



    return (
        <>
        {store.auth === true ? <Navigate to = "/"/> : ""}
        

        <div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
      
    </div>
    <div className="col-6">
    <div className="container mt-5">
            <h1>Accede como Administrador</h1>
            <br></br>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Acceder
                </button>
            </form>
        </div>
    </div>
    <div className="col">
     
    </div>
  </div>
</div>





        
        </>
    );
};

export default AdminForm;