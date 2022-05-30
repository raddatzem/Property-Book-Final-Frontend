import {useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

function Login() {

let nav = useNavigate()

//state for login info
const [loginInfo, setLoginInfo] = useState(
  {
    username: "",
    password: ""
  }
)


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
      
        nav("/manageproperties")


    }
    
  })
}







return (
    <div className="form_div">
      {/* Start Login Form */}
        <h1>Login</h1>
        <ToastContainer/>
        
        <form id="login_form" className="form_class"  onSubmit={handleLoginSubmit }>
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
          <br></br>
          <br></br>
          <input className="button-81" role="button" type="submit" value="Login" />
        </form>

    </div>
  );




}

export default Login