import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';
import { updatePost2 } from './update';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { Formik } from 'formik';




const All = () => {

  const [fullData, setFullData] = useState([])
  const [edit, setEdit] = useState(false)


  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/functions/all`)
      .then(response => response.json())
      .then(data => {
        setFullData(data)
        // data.map((post, ind) => {
        //   console.log("start")
        //   console.log(post)
        //   setData(pre => [pre, {message: post.data.detail, id: data[ind].ref['@ref'].id }])
      });
      
  }, [fullData]);

  console.log(fullData);


  const handleChange = (e) => {
    console.log(e)
    //console.log(e)
    //setEditData(e.target.value)
    //setEdit(false)
    updatePost(e)

  }

  const handleUpdate = (e) => {
    console.log(e)
    updatePost2(e)
  }


  return (
    <div>

      {fullData.map((post, ind) => {


          return (
            
              <div key={ind}>
                {console.log(ind)}
                {
                !edit? 
                <div >
                     
                      <Button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> <DeleteForeverSharpIcon/> </Button> 
                      {post.data.detail}
                      <Button onClick={ () => {setEdit(true)}} > <UpdateIcon/> </Button> 
                </div> :
                <div>
                      <TextField fullWidth="true" variant="outlined" type="text" defaultValue={post.data.detail} onChange={(e)=> handleChange({ id: fullData[ind].ref['@ref'].id, message:  e.target.value, update: true })} />
                      <Button variant="outlined" color="primary" onClick={()=> {setEdit(false)}}> done </Button> <br />
                </div>                  
                
                  
                  }

              </div>
          )}
        )}

    </div>
  )
}



export default All
