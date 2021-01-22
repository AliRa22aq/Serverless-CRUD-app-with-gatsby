import React from "react"
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Add = () => {

  return (
    <div>
      <h1>Write Something good and let the words spread through this site </h1>
      <Formik
        initialValues={{ message: '' }}
        validate={values => {
          const errors = {};
          if (!values.message) {
            errors.message = 'Required';
          }
          return errors;
        }}
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
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth="true" variant="outlined" type="text" 
              type="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            {errors.message && touched.message && errors.message}

            <Button type="submit" >
              Submit
           </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Add
