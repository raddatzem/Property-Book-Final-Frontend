import React, {useState, useEffect} from 'react';


function Properties({listProperties, setRecentUpdatedProperty}) {

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
                    <p className="card-text">Managed by:  <br></br>{property.manager.name}
                        <img 
                            src={property.manager.image}
                            alt={property.manager.name}
                            className="manager__image"
                        />
                        <br></br>{property.manager.bio}
                    </p>
       
                       <button onClick={ (e) => {
                           setCurId(property.id)
                           toggleEditForm(!showEditForm) 
                        } }>EDIT</button>
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

