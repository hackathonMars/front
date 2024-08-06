import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

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
      {widthWindow < 1024 && <Footer />}
    </div>
  );
};

export default Layout;