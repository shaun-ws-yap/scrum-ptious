import '../styles/App.css';
import { Route, BrowserRouter as Router, withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

import "../styles/Sidebar.css";

function App() {
  return (
    <main className="layout">
      <section className="sidebar">
        <Sidebar />
      </section>
    </main>
  );
}

export default App;
