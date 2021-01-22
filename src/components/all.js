import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';



const All = () => {

  const [fullData, setFullData] = useState([])
  const [edit, setEdit] = useState(false)
  const [editData, setEditData] = useState();

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
            
              <div key={post.ts}>
                {
                !edit? 
                <div>
                      {post.data.detail}
                      <button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> X </button> 
                      <button onClick={()=> setEdit(true)}> Update </button> :
                </div> :
                <div>
                      <input type="text" focus defaultValue={post.data.detail} onChange={(e)=> handleChange({ id: fullData[ind].ref['@ref'].id, message:  e.target.value })} /> 
                      <button onClick={()=> setEdit(false)}> done </button>
                </div>                  
                
                  
                  }

             
                
              </div>
          )}
        )}

    </div>
  )
}



export default All
