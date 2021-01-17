import '../styles/App.css';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo'

import 'react-pro-sidebar/dist/css/styles.css';

function App() {
  return (
    <div className="container">
      <div className="main">
        <Sidebar />
        <Dashboard />
        <UserInfo />
      </div>
    </div>
  );
}

export default App