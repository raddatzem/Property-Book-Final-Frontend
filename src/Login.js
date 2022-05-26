import {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Properties from "./Properties";
import PropertyForm from "./AddProperty";




function Login() {
  

//state of properties
const [allProperties, setAllProperties] = useState([])
console.log(allProperties)

const [recentUpdatedProperty, setRecentUpdatedProperty] = useState({})

//add new house submitted via form to list of houses
const addProperty = (newProperty) =>{
  setAllProperties([...allProperties, newProperty])
}


//state of logged in user
const [currentUser, setCurrentUser ] =  useState(null);
console.log(currentUser)
//state for login info
const [loginInfo, setLoginInfo] = useState(
  {
    username: "",
    password: ""
  }
)


  
// login -fetch all users
useEffect( ()=>{
  fetch ("/userInSession")
  .then (res => res.json())
  .then ( userAlreadyLoggedIn => {
    setCurrentUser(userAlreadyLoggedIn)
  })}, [] )

//Logic here is: If [currentUser, recentyUpdatedProperty] chnages, then it runs the code below.  
//This is nice because we wont have endless loops, fetching data over and over and over
//It is also nice because we can force this code to execute just by changing "recentUpdatedProperty"
useEffect( ()=>{
  if(currentUser){
    fetch (`http://localhost:3000/properties/${currentUser.id}`)
    .then (res => res.json())
    .then (properties => {
      setAllProperties(properties)
    })
  }
  }, [currentUser, recentUpdatedProperty] )



//funtion to handle on change for username and password
const onChangeLogin =(e)=>{
  e.preventDefault()
  setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
}



//function to handle login submit button
const handleLoginSubmit=(e)=>{
  e.preventDefault()
  console.log(loginInfo)
  
  //Login
  fetch("/login" , 
  {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo)
    }
  )
  .then(res => res.json())
  .then(user => {

    if (user.error){
        toast.error(`error:${user.error}`)
    } else {
        setCurrentUser(user)
        toast(`You've logged in as ${user.username}`)
    }
  

  
    
  })
}

//function to handle logout button
const handleLogout =()=> {
 
  // DELETE
  fetch( `/logout` , 
  
  {method: "DELETE"})
  .then( r => r.json() )
  .then( (deleteResponse) => {
    setAllProperties([])
    setCurrentUser(null)
  })

}
// //function to handle delete button
// const handlePropertyDelete =(propertyObj)=> {
 
//   // DELETE
//   fetch( `/properties/${id}` , 
  
//   {method: "DELETE"})
//   .then( r => r.json() )
//   .then( (deleteResponse) => {
//     const filterResult = allProperties.filter((eachPropObj)=>{
//       if (eachPropObj.id != propertyObj.id){
//           return eachPropObj
//       }
//     })
//     setAllProperties([...filterResult])
//   })

// }

return (
    <div>
      {/* Start Login Form */}
        <h1>Login</h1>
        <ToastContainer />
        <form onSubmit={handleLoginSubmit}>
        <label>Username:
          <input className='form-card' onChange={onChangeLogin}
                  name="username"  
          />
          </label>
          <br></br>
          <br></br>
          <label>Password:
          <input className='form-card' type="password" onChange={onChangeLogin} 
                  name="password" 
          />
          </label>
          <input type="submit" value="Login"/>
        </form>
        <br></br>
        <button onClick={handleLogout}>Logout</button>
        <br></br>
        <br></br>
    {/* start add property form */}
    <PropertyForm addProperty={addProperty} user={currentUser} />
      
    
    <Properties listProperties={allProperties} setRecentUpdatedProperty={setRecentUpdatedProperty}/>
    
    </div>
  );




}

export default Login