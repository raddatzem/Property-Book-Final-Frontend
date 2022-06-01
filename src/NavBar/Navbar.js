import React from 'react'

import "./Navbar.css"
import { Link } from "react-router-dom"


function Navbar({currentUser}){

    if (currentUser){
        return(
            <div>
               <nav className="NavbarItems">
               <h1 className="navbar-logo">Property Book</h1> &nbsp;&nbsp;&nbsp;
               <img className='icon' src="https://cdn0.iconfinder.com/data/icons/school-and-learning-1/24/school-library-book-house-home-read-learn-learning-512.png"></img>
               &nbsp;&nbsp;
                <Link className='nav-links' to="/logout">Logout</Link>
                
        
               </nav>
            </div>
           )
    }   else{
        return(
            <div>
               <nav className="NavbarItems">
               <h1 className="navbar-logo">Property Book</h1> &nbsp;&nbsp;&nbsp;
               <img className='icon' src="https://cdn0.iconfinder.com/data/icons/school-and-learning-1/24/school-library-book-house-home-read-learn-learning-512.png" ></img>
               &nbsp;&nbsp;
               <Link className='nav-links' to="/signup">Signup</Link>
                  
                <Link className='nav-links' to="/login">Login</Link>
         
    
               </nav>
            </div>
           )
    }
    

}

export default Navbar