import React from 'react'
import companyLogo from '../logo.png';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"


            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save authtoken
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Welcome Back!", "success")
            navigate("/");
            
            

        }
        else{
            props.showAlert("Invalid User Information", "danger")
        }
    }
    const onChange = (e) => {


        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
        <div className='row my-3'><form className='col-md-6' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>

            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} minLength={5} required/>
            </div>

            <button type="submit" className="btn" style={{backgroundColor: "#76323F", color:"white"}} >Submit</button>
        </form>
            <div className='col-md-6 my-2'>
                <img src={companyLogo} alt="Bootstrap" width="500" height="350" style={{ borderRadius: "30px" }} />
            </div>
        </div>
    )
}
