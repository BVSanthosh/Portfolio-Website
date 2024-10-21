/**
 * Root component of the application where all the other components are mounted onto
 */

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Auth from './components/Auth/Auth.jsx';  //imports the Home component
import Login from './components/Auth/Login.jsx';  //imports the Login component
import Signup from './components/Auth/Signup.jsx';  //imports the Signup component
import Form from './components/Form/Form.jsx';  //imports the Form component
import Profile from './components/Profile/Profile.jsx'; //imports the Profile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}/> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;