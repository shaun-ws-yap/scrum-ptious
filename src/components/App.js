import '../styles/App.css';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo';
import TaskResource from './Dashboard/TaskResource';

import 'react-pro-sidebar/dist/css/styles.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Sidebar />
        <div className="main">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/chat" component={Chat} />
            {/* <TaskResource /> */}
          </Switch>
        </div>
      </Router>
      <UserInfo />
    </div>
  );
}

export default App