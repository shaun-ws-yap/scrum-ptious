import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';

// import SidebarItem from './SidebarItem';
import classNames from 'classnames';



export default function Sidebar(props) {
  const menuClass = classNames("sidebar__item", {
    'sidebar__item--selected': selected
  })

  const [menu, setMenu] = useState()


  return (
      <div className="sidebar">
      <ProSidebar width="150px">
        <SidebarHeader>
          <img src={"https://logoipsum.com/logo/logo-25.svg"}></img>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <MenuItem className={menuClass} onClick={() => }>
              <Link to="/">
                Dashboard
              </Link>
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem className={menuClass} onClick={() => }>
              <Link to="/tasks">
                Tasks
              </Link>
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem className={menuClass} onClick={() => }>
              <Link to="/chat">
                Chat
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <button>Logout</button>
        </SidebarFooter>
      </ProSidebar>
      </div>
  )
}