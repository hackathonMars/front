import React from 'react'
import { IoCameraOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdReportGmailerrorred } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
  return (
    <div>
      <div className="btm-nav">
  <button>
  <IoCameraOutline />
  </button>
  <button className="active">
  <IoMdAddCircleOutline />
  </button>
  <button>
  <MdReportGmailerrorred />
  </button>
  <button>
  <CgProfile />
  </button>
</div>
    </div>
  )
}

export default Footer
