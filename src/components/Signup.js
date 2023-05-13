import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import companyLogo from '../logo.png';
export const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if(!(password===cpassword)){
      return props.showAlert("Please confirm correct password","danger")
    }
    const response = await fetch
      ("http://localhost:5000/api/auth/createuser", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"


        },
        body: JSON.stringify({ name, email, password })

      });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save authtoken
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Yipeee!!! Account Created", "success")

    }
    else {
      props.showAlert("Invalid User Information", "danger")
    }
  }
  const onChange = (e) => {


    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className='container row my-3'><form className='col-md-6' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
      </div>
      
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
      <div className='col-md-6 my-2'>
        <img src={companyLogo} alt="Bootstrap" width="500" height="350" style={{ borderRadius: "30px" }} />
      </div></div>
  )
  
}
