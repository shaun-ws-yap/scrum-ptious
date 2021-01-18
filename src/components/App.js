import '../styles/App.css';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo';
import TaskResource from './Dashboard/TaskResource';

import 'react-pro-sidebar/dist/css/styles.css';

function App() {
  const [menu, setMenu] = useState("Dashboard");

  return (
    <div className="container">
      <section className="sidebar">
        <img 
          className="sidebar-centered"
          src="https://logoipsum.com/logo/logo-25.svg"
        />
        <nav className="sidebar__menu">
          <Sidebar
            menu={menu}
            setMenu={setMenu}
          />
        </nav>
      </section>

      <section className="main">
        <Dashboard 
          menu={menu}
        />
      </section>
      
      <section className="user__info">
        <UserInfo />
      </section>
    </div>
  );
}

export default App