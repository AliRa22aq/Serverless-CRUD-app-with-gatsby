import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
// import { Formik, Field, Form } from 'formik';



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

  const [fullData, setFullData] = useState([]);
  const [update, setUpdate] = useState({id: '', message: ''});
  console.log(update)
  console.log("update")

  const handleChange = (e) => {
    console.log(e)
    updatePost(e)
  }

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/functions/all`)
      .then(response => response.json())
      .then(data => {
        setFullData(data)
      });
      
  }, [fullData]);



  return (
    <div>

      { fullData.map((post, ind) => {

          return ( 

              <div key={ind}>

                      <Button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> <DeleteForeverSharpIcon/> </Button> 
                      {post.data.detail}
                      <Button onClick={() => {
                        handleOpen()
                        setUpdate({ id: fullData[ind].ref['@ref'].id, message: fullData[ind].data.detail})
                        }}> <UpdateIcon/> </Button> 
                                                          
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper} div key={ind}>
                      <h2 id="simple-modal-title">Update Please</h2>
                      <p id="simple-modal-description">

                        <TextField 
                        fullWidth="true" 
                        variant="outlined" 
                        type="text" 
                        defaultValue={update.message} 
                        onChange={(e) => handleChange({ id: update.id, message: e.target.value})} />

                        <Button variant="outlined" onClick={handleClose} color="primary" > done </Button> <br />
                        {/* <Formik 
                                  initialValues={{ post: ''}}
                                  onSubmit={(values) => {
                                    handleChange(values.post, updateID)
                                  }}
                              >
                                  {
                                      (formik) => (
                                          <Form onSubmit={formik.handleSubmit} >
                                              <Field as={TextField} variant='outlined' name='post' label='update post' />
                                              <div style={{marginTop: '20px'}} >
                                                  <Button type='submit' color='secondary' variant='outlined' >Update</Button>
                                              </div>
                                          </Form>
                                      )
                                  }

                              </Formik> */}




                      </p>
                    </div>
                  </Modal>

              </div>
          )}
        )}


          </div>
          )  


}

export default All


