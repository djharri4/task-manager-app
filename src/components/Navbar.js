import React from 'react';
import '../App.css'; 

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>Welcome user</h1>
      <div className="nav-links">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          
          <span className="user-email"></span> 
        )}
      </div>
    </nav>
  );
};

export default Navbar;
