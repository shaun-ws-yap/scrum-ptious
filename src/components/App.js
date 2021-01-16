import '../styles/App.css';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import Routes from '../routes'

import "../styles/Sidebar.css";

function App() {
  return (
    <div className="container">
      <div style={{display: "flex"}}>
        <Sidebar />
        <div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App