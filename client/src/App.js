/**
 * Root component of the application where all the other components are mounted onto
 */

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Auth from './components/Auth/Auth.jsx';  //imports the Home component
import Login from './components/Auth/Login.jsx';  //imports the Login component
import Signup from './components/Auth/Signup.jsx';  //imports the Signup component
import PortfolioForm from './components/PortfolioForm/PortfolioForm.jsx'; //i
import PortfolioPage from './components/PortfolioPage/PortfolioPage.jsx'; //imports the Profile componentimports the Form component

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Auth />}/> 
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/form" element={<PortfolioForm />}/>
          <Route path="/portfolio" element={<PortfolioPage />}/>
        </Routes>
    </Router>
  );
}

export default App;