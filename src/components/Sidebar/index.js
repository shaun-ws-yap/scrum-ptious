import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';


export default function Sidebar(props) {
  return (
    <Router>
      <ProSidebar width="150px">
        <SidebarHeader>
          <img src={"https://logoipsum.com/logo/logo-25.svg"}></img>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <MenuItem>
              Dashboard
              <Link to="/" />
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem>
              Tasks
              <Link to="/tasks" />
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem>
              Chat
              <Link to="/chat" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <button>Logout</button>
        </SidebarFooter>
      </ProSidebar>
    </Router>
  )
}