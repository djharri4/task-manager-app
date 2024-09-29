
import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Task Manager. All Rights Reserved.</p>
        <p>Created by Devonte Harris</p>
      </div>
    </footer>
  );
};

export default Footer;
