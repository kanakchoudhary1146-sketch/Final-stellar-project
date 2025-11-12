import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = {
    name: "Kanak Agarwal",
    wallet: "GA4Y3...L9D8",
    policies: 3,
    profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${theme}`}>
      <h2 className="logo">DeFi Guard</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/buy">Buy Insurance</Link></li>
        <li><Link to="/claim">Claims</Link></li>
        <li><Link to="/invest">Invest</Link></li>
      </ul>

      <div className="nav-right">
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="profile-wrapper" ref={menuRef}>
          <div
            className="profile-section"
            onClick={() => setIsOpen(!isOpen)}
            title={user.name}
          >
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
          </div>

          {isOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <img src={user.profilePic} alt="User" className="profile-pic-lg" />
                <div className="profile-info">
                  <h4>{user.name}</h4>
                  <p>Wallet: {user.wallet}</p>
                  <p>Active Policies: {user.policies}</p>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout 🚪
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
