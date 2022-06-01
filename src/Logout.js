
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';


function Logout({setCurrentUser, setAllProperties}){
let nav = useNavigate();

//function to handle logout button
const handleLogout =()=> {
 
    fetch( `/logout` , 
    
    {method: "DELETE"})
    .then( r => r.json() )
    .then( (deleteResponse) => {
      
      setAllProperties([])
      setCurrentUser(null)
      nav("/login")
    })
  
  }

return(

    <>
     <br></br>
    <br></br>
    <h1>Are you sure you want to logout?</h1>
    <br></br>
    <br></br>
    <button onClick={handleLogout} className="button-29" role="button" >Logout</button>
    <br></br>
    <br></br>
    
    </>
)


}

export default Logout