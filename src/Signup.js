import React, {useState, useEffect} from 'react';


function Signup(){

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
    console.log(data)
  })
  
  }
  return(
    <div>
    <h1>Sign Up</h1>

    <form onSubmit={onSubmit}>
    <label> Username:  
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
    </label>
    <br></br>
    <br></br>
    <label> Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>

    <input type="submit"/>
    </form>
    </div>

  )



}







export default Signup;