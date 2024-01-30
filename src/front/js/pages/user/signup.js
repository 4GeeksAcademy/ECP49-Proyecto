import React, {useContext, useState} from "react";
import { Context } from "../../store/appContext";
import {useNavigate } from "react-router-dom";

const Signup = () => {    
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({email: "", password: ""});
    const navigate = useNavigate();

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    return(

        <div class="container text-center">
  <div class="row align-items-start">
    <div class="col">
      
    </div>
    <div class="col">
    <div className="container mt-5">
            <form className="new-form-control">
                <p className="new-title">Signup user</p>
                <div className="new-input-field">
                    <input
                        required=""
                        className="new-input"
                        type="text"
                        id="email"
                        value={formValue.email}
                        onChange={onChange}
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
                        value={formValue.password}
                        onChange={onChange}
                    />
                    <label className="new-label" htmlFor="password">
                        Enter Password
                    </label>
                </div>
                <button
                    className="new-submit-btn"
                    type="button"
                    onClick={() => actions.signUp(formValue, navigate)}
                >
                    Signup
                </button>
            </form>
        </div>
    </div>
    <div class="col">
      
    </div>
  </div>
</div>







       
    );
}

export default Signup