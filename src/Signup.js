import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';


function Signup(){
  let nav = useNavigate()
//state for signup
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")


//function to handle change for signup username and password
function onSubmit (e){
    e.preventDefault()
   const user = {
    username: username, 
    password: password
   }



//Signup
  fetch("/users" , 
  {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
  )
  .then(res => res.json())
  .then(data => {
    if (data.error){
      toast.error(`error:${data.error}`)
    } else {
      nav("/manageproperties")
 
  }
    
  })
  
  }
  return(
    <div>
      <br></br>
    <h1>Sign Up</h1>
      <br></br>
    <form id="login_form" className="form_class"  onSubmit={onSubmit}>
    <label> 
      Create Username:  
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
    </label>
    <br></br>
    <br></br>
    <label> Create Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
  <br></br>
  <br></br>
    <input className="button-29" type="submit"/>
    </form>
    </div>

  )



}







export default Signup;