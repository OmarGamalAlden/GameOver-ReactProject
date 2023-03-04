import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return <>

  <nav className="navbar navbar-expand-lg bg-dark position-fixed start-0 end-0 top-0">
  <div className="container-fluid ms-5 me-5 ps-5 pe-5 py-2">
    <div className="Loggoo">
      <img src="logo.png" className='ms-2' alt="websiteLogo" />
      <Link className="navbar-brand" to={"/home"}>Game Over</Link>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to={"/login"}>Login</Link>
        </li>
        <li className="nav-item ms-3 me-3">
          <button className='btn btn-outline-info'><Link className="nav-link" to={"/register"}>Join Free</Link></button>
        </li>
      </ul>
  
    </div>
  </div>
</nav>

  </>
}
