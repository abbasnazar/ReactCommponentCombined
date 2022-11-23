// import React from 'react'
// import "./Navbar.scss"
// import logo from '../img/logo.png'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

// const Navbar = () => {
//   const [click, setClick] = useState(false);

//   const handelClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="" />
//       </Link>
//       <div className="content">
//         <a href="">
//           <Link className='link' to="/">Home</Link>
//         </a>
//         <a href="">
//           <Link className='link' to="jobseekers">Job Seekers</Link>
//         </a>
//         <a href='https://www.jobmojo.ai/#/sign-in'>
//           Employer Login
//         </a>
//         <a href="">
//           <Link className='link' to="contact">Contact</Link>
//         </a>
//       </div>
//       <div className="button">
//         <button className='btn'>
//              <a href="https://www.jobmojo.ai/#/requestTrial">Request a demo</a> 
//         </button>
//       </div>

//       <div className="navbar-menu">
//         {click ? <RiCloseLine color='#fff' size={27} onClick={() => setClick(false)}/>
//         : <RiMenu3Line color='#fff' size={27} onClick={() => setClick(true)} />
//         }
//         {click && (
//           <div className="navbar-menu_container">
//             <div className="content"> 
//               <a href="">
//                 <Link className='link' to="/">Home</Link>
//               </a>
//               <a href="">
//                 <Link className='link' to="jobseekers">Job Seekers</Link>
//               </a>
//               <a href='https://www.jobmojo.ai/#/sign-in'>
//                 Employer Login
//               </a>
//               <a href="">
//                 <Link className='link' to="contact">Contact</Link>
//               </a>
//             </div>
//             <div className="button">
//               <button className='btn'>
//                <a href="https://www.jobmojo.ai/#/requestTrial">Request a demo</a> 
//               </button>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import "./Navbar.scss"
import logo from '../img/logo.png'
import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'

const Navbar = () => {
  const [click,setClick] = useState(false)

  const handelClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> 
              <img src={logo} alt="" className="navbar-icon"/>
            </Link> 
            <div className="menu-icon" onClick={handelClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div> 
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink> 
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/jobseekers" 
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Job Seekers
                </NavLink> 
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/employerlogin" 
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Employer Login
                </NavLink> 
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink> 
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  <button className="btn">Reauest a Demo</button>
                </NavLink> 
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>   
    </>
  );
}

export default Navbar