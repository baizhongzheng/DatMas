import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DatMas</h3>
            <p>A secure text anonymization tool for researchers, businesses, and privacy advocates.</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: <a href="mailto:info@datmas.example.com">info@datmas.example.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DatMas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 