import React, {useState, useEffect} from 'react';


function Properties({listProperties, setAllProperties, setRecentUpdatedProperty}) {

//start manager edit logic
const [manager, setManager] = useState([])
const [selectedManager, setSelectedManager] = useState("")

const handleManagerSelection =(e)=>{
    setSelectedManager(e.target.value)
  }




//get managers
useEffect( ()=>{
    fetch ("/managers")
    .then (res => res.json())
    .then ( manager => {
      setManager(manager)
    })}, [] )





    const [ showEditForm, toggleEditForm ] = useState(false)
    const [ curId, setCurId] = useState(null);
    // userInfoBeingEdited, updateUserInfoBeingEdited
    const [ editedProperty, setEditedProperty] = useState(
        {
        name: "",
        address: "",
        notes: "",
        image: ""
        }
    )
    

      const handleEditSubmit = (e)=>{
        e.preventDefault()


        fetch( `/properties/${curId}` , {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(         {
                name: editedProperty.name,
                address: editedProperty.address,
                notes: editedProperty.notes,
                image: editedProperty.image
                })
          } ).then (res => res.json())
             .then(property => {
            setRecentUpdatedProperty(property)
          })

      }


      const handlePropertyDelete = (propertyToDelete)=> {
        console.log("Delete: ", propertyToDelete)
      const id = propertyToDelete.id
        // DELETE
        fetch( `/properties/${id}` , 
        
        {method: "DELETE"})
        .then( ()=>{
            let filterResult = listProperties.filter((eachProperty)=>{
                if (eachProperty.id != propertyToDelete.id){
                    return eachProperty 
                }

            })
            setAllProperties([...filterResult])
            console.log([...filterResult])
          })   
        } 
        

 


    const propertiesToList = listProperties.map((property) =>
        <li className="cards__item" key={property.id.toString()}>
            <div className="card">
            <img 
            src={property.image}
            alt={property.name}
            className="card__image"
          />
            <div className="card__content">
                <div className="card__title">{property.name}</div>
                    <p className="card-text">{property.address}</p>
                    <p className="card-text">{property.notes}</p>
                    <br></br>
                    <br></br>
                    <p className="card-text">Managed by:  <br></br>{property.manager.name}
                    <br></br>
                    <br></br>
                        <img 
                            src={property.manager.image}
                            alt={property.manager.name}
                            className="manager__image"
                        />
                        <br></br>{property.manager.bio}
                    </p>
                    <br></br>
                    
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

                       <button  
                       
                          onClick={ (e) => {
                           setCurId(property.id)
                           toggleEditForm(!showEditForm) 
                        } }> <span className="material-symbols-outlined">
                        edit
                        </span></button>

                        <br></br>
                         <button className="button-30"
                         
                           onClick={ (e)=> {
                            handlePropertyDelete(property)} } > <span className="material-symbols-outlined">
                            delete_forever
                            </span></button>
                </div>
              
            </div>

        </li>
   
    );


 
  
   


    const myForm = () =>{
        if (showEditForm){
            return <div>
                            <form onSubmit={handleEditSubmit}>
                                
                                <h3>Edit Property Details</h3>

                                <label htmlFor="name">Name:     </label>
                                <input className='form-card' type="text" id="name" name="name" defaultValue={editedProperty.name} onChange={(e) => setEditedProperty({
                                    "name" : e.target.value
                                })}/>

                                    <br></br><br></br>

                                <label htmlFor="address">Address: </label>
                                <input className='form-card' type="text" id="address" name="address" defaultValue={editedProperty.address} onChange={(e) => setEditedProperty({
                                    "address" : e.target.value
                                })} />

                                    <br></br><br></br>

                                <label htmlFor="notes">Notes:     </label>
                                <input className='form-card' type="text" id="notes" name="notes" defaultValue={editedProperty.notes} onChange={(e) => setEditedProperty({
                                    "notes" : e.target.value
                                })} />

                                <br></br><br></br>

                                <label htmlFor="image">Image:     </label>
                                <input className='form-card' type="text" id="image" name="image" defaultValue={editedProperty.image} onChange={(e) => setEditedProperty ({
                                    "image" : e.target.value
                                })}/>

                                <br></br><br></br>  


                                <select onChange={handleManagerSelection} value={selectedManager}>
                                    <option>Select Manager</option>
                                    { manager.map( (manager)=>{
                                        return(<option key={manager.id} value={manager.name}>{manager.name}</option>)
                                    })
                                    }
                                    </select>


                                    <br></br><br></br>



                                <button className='button' type="submit">Confirm Changes</button>
                    
                    
                            </form> 
                </div>
        } else {
            return null
        }
    }  







    if (listProperties.length > 0){
        return  <div> 
            <ul>{propertiesToList}</ul>
            <div>{myForm()}</div>
        </div>
            
    } else {
        return  <h1> You Have no Properties</h1>
        
    }
  }

  
 export default Properties;

