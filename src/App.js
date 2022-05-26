import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Link } from "react-router-dom"
import './App.css';
import Navbar from './NavBar/Navbar';
import Signup from './Signup.js';
import Login from './Login.js';

function App() {


  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path="/signup" element={<Signup />}  />

        <Route path="/login" element={<Login />}  />
        
        
      </Routes>
      
    </div>
  );
}

export default App;
