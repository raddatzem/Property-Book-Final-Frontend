import React from 'react'

import "./Navbar.css"
import { Link } from "react-router-dom"


function Navbar({currentUser}){

    if (currentUser){
        return(
            <div>
               <nav className="NavbarItems">
               <h1 className="navbar-logo">Property Book</h1>
               <img className='icon' src="https://www.freeiconspng.com/uploads/house-icon-png-white-32.png"></img>
                
                <Link className='nav-links' to="/logout">Logout</Link>
                
        
               </nav>
            </div>
           )
    }   else{
        return(
            <div>
               <nav className="NavbarItems">
               <h1 className="navbar-logo">Property Book</h1>
               <img className='icon' src="https://www.freeiconspng.com/uploads/house-icon-png-white-32.png"></img>
             
               <Link className='nav-links' to="/signup">Signup</Link>
                  
                <Link className='nav-links' to="/login">Login</Link>
         
    
               </nav>
            </div>
           )
    }
    

}

export default Navbar