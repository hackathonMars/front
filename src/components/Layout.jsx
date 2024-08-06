import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar'; // Assuming you have a Navbar component

const Layout = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidthWindow(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
      <div className="flex flex-grow gap-2">
        {widthWindow >= 1024 && (
          <Sidebar />
        )}
        <div className="flex-grow p-3">
          <Outlet />
        </div>
      </div>
      {widthWindow < 1024 && <BottomNavigation />}
    </div>
  );
};

export default Layout;