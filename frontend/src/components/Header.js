import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">
            <h1>DatMas</h1>
            <span className="tagline">Data Masking Made Simple</span>
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="https://github.com/yourusername/datmas" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 