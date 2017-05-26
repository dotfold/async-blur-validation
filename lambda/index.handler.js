'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {

    const done = (err, res) => context.succeed({
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    const emailRE = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    const validate = (body, done) => {
      if (body.username) {
        const result = emailRE.test(body.username);
        result
          ? done(undefined, { validationResult: true, errors: [] })
          : done(undefined, { validationResult: false, errors: [ 'Username is invalid' ]});
      }
      done();
    };

    switch (event.httpMethod) {
        case 'DELETE':
            console.log('DELETE not supported');
            break;
        case 'GET':
            console.log('GET not supported');
            break;
        case 'POST':
            validate(JSON.parse(event.body), done);
            break;
        case 'PUT':
            console.log('PUT not supported');
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
