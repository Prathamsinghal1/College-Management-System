import React, { useState } from 'react'
import { FaChalkboardTeacher, FaDiscourse, FaHome, FaUser } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import '../../App.css';
import { PiStudent } from 'react-icons/pi';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const links = [
    {
      id:1,
      name:"Home",
      icon:<FaHome className="nav-icon"/>,
      path:"/",
    },
    {
      id:2,
      name:"Dashboard",
      icon:<MdDashboard className="nav-icon"/>,
      path:"/dashboard",
    },
    {
      id:3,
      name:"Login",
      icon:<IoMdLogIn className="nav-icon"/>,
      path:"/login",
    },
    {
      id:4,
      name:"Register",
      icon:<GiArchiveRegister className="nav-icon"/>,
      path:"/register",
    },
    {
      id:5,
      name:"Students",
      icon:<PiStudent className="nav-icon"/>,
      path:"/student",
    },
    {
      id:6,
      name:"Faculty",
      icon:<FaChalkboardTeacher className="nav-icon"/>,
      path:"/faculty",
    },
    {
      id:7,
      name:"Courses",
      icon:<FaDiscourse className="nav-icon"/>,
      path:"/course",
    },
    {
      id:7,
      name:"Profile",
      icon:<FaUser className="nav-icon"/>,
      path:"/profile",
    },
  ]
  const [open, setOpen] = useState(false);

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  if(!isLoggedIn){
    links.splice(3, 1);
    links.splice(3, 3);
    links.splice(3, 1);
  }
  if(isLoggedIn && role === "student"){
      links.splice(2, 2);

  }
  if(isLoggedIn && role === 'admin'){
      links.splice(2, 1);
  }
  if(isLoggedIn && role === 'faculty'){
      links.splice(2, 2);
  }


  return (
    <nav className="nav lg:fixed lg:right-[30px] lg:flex lg:items-center lg:h-full z-[99]">
  <div 
    className={`fixed inset-0 w-full px-[30px] py-[60px] bg-[hsl(0,0%,93%)] lg:[all:unset] transition-all duration-500  
    ${open ? "left-0" : "left-[-100%]"} z-[9999]`} 
    style={{ transition: "all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1)" }}
  >
    <ul className="nav-list ">
      {links.map((item, index) => {
        return (
          <li className="nav-item lg:m-[20px]" key={index}>
            <Link
              to={item.path}
              className="nav-link cursor-pointer group flex gap-[24px] items-center p-[14px] text-[hsl(0,0%,40%)] focus:text-[hsl(271,76%,53%)] lg:p-0 lg:bg-[hsl(0,0%,93%)] lg:w-[50px] lg:h-[50px] lg:rounded-[50%] lg:relative lg:hover:bg-[hsl(271,76%,53%)] lg:focus:bg-[hsl(271,76%,53%)] lg:hover:text-white lg:focus:text-white lg:hover:rounded-l-lg transition-all"
              onClick={() => setOpen(!open)}
            >
              <div className="nav-icons lg:text-[20px] lg:m-auto z-[9999]">
                {item.icon}
              </div>
              <h3 className="nav-name font-[24px] font-medium lg:absolute lg:top-0 lg:right-0 lg:bg-[hsl(271,76%,53%)] lg:h-full lg:px-[25px] lg:rounded-[30px] lg:flex lg:items-center lg:text-sm lg:text-white lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300 mr-[20px] whitespace-nowrap">
                {item.name}
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>

  {/* Mobile Menu Icon */}
  <div 
    className="fixed top-[30px] right-[30px] w-[40px] h-[40px] bg-[hsl(0,0%,93%)] rounded py-[12px] px-[10px] lg:hidden z-[9999]" 
    onClick={() => setOpen(!open)}
  >
    <span className={`block w-[20px] h-[2px] rounded-[2px] bg-[hsl(0,0%,40%)] mb-[5px] transition-transform ${open ? "rotate-[45deg] translate-x-[1px] translate-y-[7px]" : ""}`}></span>
    <span className={`block w-[20px] h-[2px] rounded-[2px] bg-[hsl(0,0%,40%)] mb-[5px] transition-opacity ${open ? "hidden" : ""}`}></span>
    <span className={`block w-[20px] h-[2px] rounded-[2px] bg-[hsl(0,0%,40%)] mb-[5px] transition-transform ${open ? "rotate-[-45deg]" : ""}`}></span>
  </div>
</nav>

  )
}
