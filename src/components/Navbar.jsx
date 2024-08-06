import React from 'react';
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome, AiOutlineUser, AiOutlineBell } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="navbar shadow-md sticky top-0 z-50 px-4 py-2">
      <div className="flex-1">
        <a className="text-2xl font-bold text-green-600">EcoGram</a>
      </div>
      <div className="flex-none gap-4">
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-700 hover:text-green-600 transition">
            <AiOutlineBell className="text-2xl" />
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
