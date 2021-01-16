import '../styles/App.css';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

import "../styles/Sidebar.css";

function App() {
  return (
    <>
    {/* <main className="layout">
      <section className="sidebar"> */}
        <Router>
          <Sidebar />
          <Switch>
            <Route path='/' exact component={Dashboard}/>
            {/* <Route path='/' component={Tasks}/>
            <Route path='/' component={Teamchat}/> */}
          </Switch>
        </Router>
      {/* </section>
    </main> */}
    </>
  );
}

export default App