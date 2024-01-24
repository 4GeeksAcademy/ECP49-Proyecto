import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await actions.getToken(email, password);
      navigate("/private");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Error during login. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder="Enter your email." onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder="Enter your password." onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn mx-auto btn-primary" onClick={event => handleLogin(event)}>Login</button>
      </form>
    </div>
  );
};