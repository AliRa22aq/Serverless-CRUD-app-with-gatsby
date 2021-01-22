import React, { useState } from "react"
import { Formik } from 'formik';


const Add = () => {

  return (
    <div>
      <h1>Add</h1>
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
            <input
              type="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            {errors.message && touched.message && errors.message}

            <button type="submit" >
              Submit
           </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Add
