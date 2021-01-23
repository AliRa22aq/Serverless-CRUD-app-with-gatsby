import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';
import { updatePost2 } from './update';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
// import { Formik } from 'formik';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';




function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));






const All = () => {

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

  const [fullData, setFullData] = useState([])

  const handleChange = (e) => {
    console.log(e)
    updatePost(e)
  }


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>

      {fullData.map((post, ind) => {


          return (
            
              <div key={ind}>
                {
                <div >
                     
                      <Button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> <DeleteForeverSharpIcon/> </Button> 
                      {post.data.detail}
                      <Button onClick={handleOpen}> <UpdateIcon/> </Button> 
                                        
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                      <h2 id="simple-modal-title">Text in a modal</h2>
                      <p id="simple-modal-description">
                        Update it
                        <TextField fullWidth="true" variant="outlined" type="text" defaultValue={post.data.detail} onChange={(e) => handleChange({ id: fullData[ind].ref['@ref'].id, message: e.target.value, update: true })} />
                        <Button variant="outlined" onClick={handleOpen} color="primary" > done </Button> <br />

                      </p>
                    </div>
                  </Modal>
                </div> 
              }

              </div>
          )}
        )}

    </div>
  )
}



export default All


