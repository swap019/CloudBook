import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
const Navbar = () => {
  let location = useLocation();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    window.location.href="/login"
  }
  //used to get location
  useEffect(() => {
  }, [location])
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">CloudBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
          </ul>
          <div className="d-flex ">
            {
              !localStorage.getItem('token')?<form className='d-flex'>
              <Link className="btn btn-primary mx-2" to="/login" role="button">Log In</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
            </form>:<button className="btn btn-primary mx-2" onClick={handleLogout}> Log Out</button>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
