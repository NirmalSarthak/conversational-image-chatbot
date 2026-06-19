import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">

      {/* 🔥 LOGO */}
      <NavLink to="/" className="navbar-brand logo">
        <span className="ai-text">AI</span> Vision
      </NavLink>

      {/* 🔥 MOBILE TOGGLE */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* 🔥 NAV ITEMS */}
      <div className="collapse navbar-collapse" id="navbarContent">

        <ul className="navbar-nav mx-auto nav-links">

          {/* HOME */}
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-hover active"
                  : "nav-link nav-hover"
              }
              end
            >
              Home
            </NavLink>
          </li>

          {/* HISTORY */}
          <li className="nav-item">
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-hover active"
                  : "nav-link nav-hover"
              }
            >
              History
            </NavLink>
          </li>

          {/* 🔥 CONTACT US */}
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-hover active"
                  : "nav-link nav-hover contact-link"
              }
            >
              Contact Us
            </NavLink>
          </li>

          {/* ABOUT */}
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-hover active"
                  : "nav-link nav-hover"
              }
            >
              About
            </NavLink>
          </li>

        </ul>

        {/* 🔥 LOGIN / LOGOUT BUTTON */}
        {/* <button
          className={`btn auth-btn ${isLoggedIn ? "logout" : "login"}`}
          onClick={handleAuth}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button> */}

      </div>
    </nav>
  );
}