import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';



const All = () => {

  const [fullData, setFullData] = useState([])
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/functions/all`)
      .then(response => response.json())
      .then(data => {
        setFullData(data)
      });
  }, [fullData]);


  const handleChange = (e) => {
    console.log(e)
    //setEditData(e.target.value)
    //setEdit(false)
    updatePost(e)
  }


  return (
    <div>

      {fullData.map((post, ind) => {
          return (
            
              <div key={ind}>
                {
                !edit? 
                <div>
                     
                      <Button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> <DeleteForeverSharpIcon/> </Button> 
                      {post.data.detail}
                      <Button onClick={()=> setEdit(true)}> <UpdateIcon/> </Button> :
                </div> :
                <div>
                      <TextField fullWidth="true" label="Update" variant="outlined" type="text" defaultValue={post.data.detail} onChange={(e)=> handleChange({ id: fullData[ind].ref['@ref'].id, message:  e.target.value })} /> 
                      <Button variant="outlined" color="primary" onClick={()=> setEdit(false)}> done </Button>
                </div>                  
                
                  
                  }

             
                
              </div>
          )}
        )}

    </div>
  )
}



export default All
