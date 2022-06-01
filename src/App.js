import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Signup from './Signup.js';
import Login from './Login.js';
import ManageProperties from './ManageProperties';
import Logout from './Logout';
import {useState} from "react"



function App() {

//state of logged in user
const [currentUser, setCurrentUser ] =  useState(null);


//state of properties
const [allProperties, setAllProperties] = useState([])


  return (
    <div>
      <Navbar currentUser={currentUser}/>
      
      <Routes>
        <Route path="/signup" element={<Signup />}  />

        <Route path="/login" element={<Login />}  />
        
        <Route path="/manageproperties" element={<ManageProperties currentUser={currentUser} setCurrentUser={setCurrentUser} 
                                        allProperties={allProperties} setAllProperties={setAllProperties}/>}/>

        <Route path="/logout" element={<Logout currentUser={currentUser} setCurrentUser={setCurrentUser} 
                              allProperties={allProperties} setAllProperties={setAllProperties} />}/>
        
      </Routes>
      
    </div>
  );
}

export default App;
