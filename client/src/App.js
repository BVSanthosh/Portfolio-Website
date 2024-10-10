/**
 * Root component of the application where all the other components are mounted onto
 */

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/Home.jsx';  //imports the Home component
import Login from './components/Login.jsx';  //imports the Login component
import Signup from './components/Signup.jsx';  //imports the Signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;