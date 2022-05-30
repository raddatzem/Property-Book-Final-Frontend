import React from 'react'
import {useState, useEffect} from 'react'



function PropertyForm({addProperty, user}) {
const [name, setName] = useState("")
const [address, setAddress] = useState("")
const [notes, setNotes] = useState("")
const [image, setImage] = useState("")
const [manager, setManager] = useState([])
const [selectedManager, setSelectedManager] = useState("")

const handleName =(e)=>{
  setName(e.target.value)
}
const handleAddress =(e)=>{
  setAddress(e.target.value)
}
const handleNotes =(e)=>{
  setNotes(e.target.value)
}
const handleImage =(e)=>{
  setImage(e.target.value)
}
const handleManagerSelection =(e)=>{
  setSelectedManager(e.target.value)
}

const handleSubmit = (e) =>{
  e.preventDefault()
  const formData ={
    name, 
    address,
    notes, 
    image,
    managername: selectedManager,
    username: user.username
  }

  fetch("/properties", {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  })
  .then(res=>res.json())
  .then(newProperty =>{
    addProperty(newProperty)
  })
 
}


//get managers
useEffect( ()=>{
  fetch ("/managers")
  .then (res => res.json())
  .then ( manager => {
    setManager(manager)
  })}, [] )




  return (
    <form onSubmit={handleSubmit} >
      
      <h3>Add New Property</h3>
    
      <label htmlFor="name">Name    </label>
      <input className='form-card' type="text" id="name" name="name" value={name} onChange={handleName}/>
        <br></br><br></br>
      <label htmlFor="address">Address</label>
      <input className='form-card' type="text" id="address" name="address" onChange={handleAddress} />
        <br></br><br></br>
      <label htmlFor="notes">Notes    </label>
      <input className='form-card' type="text" id="notes" name="notes" onChange={handleNotes} />
       <br></br><br></br>
      <label htmlFor="image">Image    </label>
      <input className='form-card' type="text" id="image" name="image" onChange={handleImage}/>
        <br></br><br></br>
        <select onChange={handleManagerSelection} value={selectedManager}>
        <option>Select Manager</option>
        { manager.map( (manager)=>{
            return(<option key={manager.id} value={manager.name}>{manager.name}</option>)
        })
        }
      </select>
        <br></br>
        <br></br>
      <button className="button-81" role="button" type="submit" >Add Property</button>
    </form>
  )
}

export default PropertyForm