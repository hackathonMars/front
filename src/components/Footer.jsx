import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const linkClass = (path) =>
    `text-green-500 transition-all ${active === path ? "active" : ""}`;

  if (windowWidth >= 1024) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-base-300">
      <div className="btm-nav text-xl">
        <Link to="/" className={linkClass("/")}>
          <AiOutlineHome />
        </Link>
        <Link to="/create/blog" className={linkClass("/create/blog")}>
          <CgAddR />
        </Link>
        <Link to="/create/report" className={linkClass("/create/report")}>
          <MdOutlineReportGmailerrorred />
        </Link>
        <Link to="/profile" className={linkClass("/profile")}>
          <IoPersonCircleOutline />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
