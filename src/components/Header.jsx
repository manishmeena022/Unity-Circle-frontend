import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-blue-500">Unity-Circle</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-blue-500">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
