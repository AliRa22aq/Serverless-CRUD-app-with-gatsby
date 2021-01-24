import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';


let schema = yup.object().shape({
  message: yup.string().required("Please enter something"),
});


const Add = () => {

  return (
    <div>
      <h1>Hey, welcome to the CRUD app. Netlify functions and Fauda DB is behind this website </h1>
      
     <Formik 
        initialValues={{ message: '' }}
        validationSchema={schema}
        onSubmit={(values) => {

          fetch(`/.netlify/functions/add`, {
            method: 'post',
            body: JSON.stringify(values)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Data: " + JSON.stringify(data));
            });
        }}
      >
        {
          (formik) => (
            <Form onSubmit={formik.handleSubmit} >
              <Field as={TextField} variant='outlined' fullWidth="true" name='message' label='message' /> <br />
              <ErrorMessage name="message" />
              <div style={{ marginTop: '20px' }} >
                <Button type='submit' color='primary' variant='outlined' >Add</Button>
              </div>
            </Form>
          )
        }

      </Formik>

    </div>
  )
}

export default Add
