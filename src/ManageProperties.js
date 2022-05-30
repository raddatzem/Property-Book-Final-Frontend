import {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import Properties from "./Properties";
import PropertyForm from "./AddProperty";
import Logout from "./Logout";




function ManageProperties ({currentUser, setCurrentUser, setAllProperties, allProperties}){



const [recentUpdatedProperty, setRecentUpdatedProperty] = useState({})

//add new house submitted via form to list of houses
const addProperty = (newProperty) =>{
    setAllProperties([...allProperties, newProperty])
  }





// login -fetch all users
useEffect( ()=>{
  console.log("here")
    fetch ("/userInSession")
    .then (res => res.json())
    .then ( userAlreadyLoggedIn => {

        if (userAlreadyLoggedIn.error){
            toast.error(`error:${userAlreadyLoggedIn.error}`)
        } else {
            toast(`You are logged in as ${userAlreadyLoggedIn.username}`)
        }


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
  



// //function to handle delete button










return(
    <>
    <ToastContainer />
        <PropertyForm addProperty={addProperty} user={currentUser} />

        <Properties listProperties={allProperties} setAllProperties={setAllProperties} setRecentUpdatekdProperty={setRecentUpdatedProperty}/>

        
    </>
)

}
export default ManageProperties