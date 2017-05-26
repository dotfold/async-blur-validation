#### async-blur-validation

The form is at `src/modules/home/index.js`
The lambda code is under the `/lambda` directory

Using redux-form async blur validation, the `asyncValidate` function POSTs the form data to an AWS API Gateway endpoint configured to invoke a lambda function to perform validation.

Only the username field is configured for async blur validation.

The frontend code is running on an S3 static website bucket at http://async-validation-ui.s3-website-us-west-2.amazonaws.com/
