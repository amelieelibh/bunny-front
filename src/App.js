import logo from './logo.svg';
import './App.css';
import { Router, Link } from "@reach/router"
import Home from './views/Home';
import Users from './views/Users';
import Tasks from './views/Tasks';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Users path="/users" />
      <Tasks path="/tasks" />
      <Tasks path="/tasks/:userId" />
    </Router>
  );
}

export default App;
