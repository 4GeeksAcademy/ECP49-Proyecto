import React, { useState } from "react";

const Form = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(email, password)
    }
    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>        
    );
}



export default Form