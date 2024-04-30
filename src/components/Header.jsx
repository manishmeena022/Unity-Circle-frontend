import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Social Media
        </Link>

        {/* Navigation */}
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Explore
          </Link>
          <Link
            to="/notifications"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Notifications
          </Link>
          <Link
            to="/messages"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Messages
          </Link>
        </nav>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
            </svg>
          </Link>
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
