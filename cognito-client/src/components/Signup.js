import React, { useState } from 'react';
import UserPool from '../UserPool';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

import AWS from 'aws-sdk';

// var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    
    var attributeList = [];

    var dataEmail = {
      Name: 'email',
      Value: email
    }

    var dataPhone = {
      Name: 'phone_number',
      Value: '+84123456789'
    }
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhone = new CognitoUserAttribute(dataPhone);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhone);

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log(data);
      var cognitoUser = data.user;
      console.log('user name is ' + cognitoUser.getUsername());

      AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      });
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

      // Confirm user
      var confirmParams = {
        UserPoolId: UserPool.getUserPoolId(), /* required */
        Username: cognitoUser.getUsername() /* required */
      };
      cognitoidentityserviceprovider.adminConfirmSignUp(confirmParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
      });
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type='submit'>Signup</button>
      </form>
    </div>
  );
};
export default SignUp;