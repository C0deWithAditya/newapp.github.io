import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import "../App.css";
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-custom shadow-sm sticky-top" style={{ height: '50px' }}>
      <div className="container-fluid">
        {/* Brand/Logo */}
        <Link className="navbar-brand fw-bold fs-2" to="/home">
          Sari-Khabar<span className="highlight">Tazza</span>
        </Link>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav" // Updated this line
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Right Section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/general">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light mx-2" to="/technology">Technology</Link>
            </li>
          </ul>


          <div className="d-flex align-items-center">
            <Link to="/" className="icon-link mx-2">
              <FaSearch className="icon text-light" />
            </Link>
            <Link
              to="/"
              className="btn btn-outline-light rounded-pill mx-2 px-3 py-1"
            >
              US News
            </Link>
            <Link to="/" className="icon-link mx-2">
              <FaUser className="icon text-light" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
