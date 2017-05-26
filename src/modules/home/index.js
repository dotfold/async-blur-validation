/* eslint-disable */
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const syncValidate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const asyncValidate = (values) => {
  console.log('async validating')
  return fetch('https://qg2omnsp5k.execute-api.us-west-2.amazonaws.com/prod/validateFields', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  })
  .then(res => {
    return res.json()
  })
  .then(json => {
    console.log('status', json)
    if (!json.validationResult) {
      throw { username: 'Invalid email' }
    }
    return undefined
  })
}

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const AsyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name='username' type='text' component={renderField} label='Username' />
      <Field name='password' type='password' component={renderField} label='Password' />
      <div>
        <button type='submit' disabled={submitting}>Sign Up</button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'asyncValidation', // a unique identifier for this form
  syncValidate,
  asyncValidate,
  asyncBlurFields: ['username']
})(AsyncValidationForm)
/* eslint-enable */
