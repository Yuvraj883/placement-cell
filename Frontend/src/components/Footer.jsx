import React from 'react';
import logo from '../images/logo-pc.png';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and social media */}
        <div className="logo-social">
          <img src={logo} alt="MSIT Logo" className="logo" />
          <div className="social-links">
            <a href="https://www.facebook.com/msitnewdelhi">Facebook</a>
            <a href="https://x.com/msitnewdelhi">Twitter</a>
            <a href="https://www.linkedin.com/in/maharaja-surajmal-institute-of-technology-938408202/">LinkedIn</a>
          </div>
        </div>

        {/* Centered content */}
        <div className="centered-content">
          <h2 className="heading">Maharaja Surajmal Institute of Technology</h2>
          <p className="address">
            Address: C-4, Janakpuri, New Delhi, India | Phone: 011 4503 7193 | Email: contact@msijanakpuri.com
          </p>
        </div>

        {/* Meet the Team link */}
        <div className="meet-link">
          <a href="/meet-the-team">Meet the Team</a>
        </div>
      </div>

      <p className="copy-right">&copy; 2024 Maharaja Surajmal Institute of Technology. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
