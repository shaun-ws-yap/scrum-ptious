import React, { useState } from 'react';
// import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import "../styles/Sidebar.css";

export default function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar)

  return (
    // <Nav>

    // </Nav>
    <>
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
          <Link to='#' className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        {SidebarItem.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    </>
  )
}