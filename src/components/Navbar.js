import React from 'react'
import companyLogo from '../logo.png';
import {
  Link, useNavigate
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (

    <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#D7CEC7"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img src={companyLogo} alt="Bootstrap" width="150" height="100" style={{ borderRadius: "14px" }} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <Link className={`nav-link ${`location.pathname=="/"? "active": ""`}`} aria-current="page" to="/" style={{ fontSize: "30px" ,fontWeight:"bold" }}>Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className={`nav-link ${`location.pathname=="/about"? "active": ""`}`} to="/about" style={{ fontSize: "30px", fontWeight:"bold"  }}>About</Link>
            </li>



          </ul>

          <form className="d-flex">
            {!localStorage.getItem("token") ? <>
              <Link type="button" className="btn  btn-lg mx-3" to="/login" style={{backgroundColor:"#76323F", color:"white"}}>Login</Link>
              <Link type="button" className="btn btn-success btn-lg mx-3" to="/signup">Signup</Link>
            </> : <button onClick={handleLogout} className='btn btn-lg mx-3' style={{backgroundColor: "#76323F", color: "white"}}>Logout</button>}

          </form>
        </div>
      </div>
    </nav>
  )
}
