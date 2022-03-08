import {createContext, useContext, useEffect, useState} from 'react';
import {sign} from 'react-native-pure-jwt';
import {API_URL} from './weavy-constants';
import UserContext from './weavy-user-context';
//import {WEAVY_SECRET, WEAVY_CLIENT_ID} from '@env';
var axios = require('axios');

const WEAVY_CLIENT_ID = 'clientid';
const WEAVY_SECRET = 'clientsecret';

//const {connect} = useContext(ConnectionContext);

//generates a weavy user jwt token
async function generateJWT(sub, email, name, photoURL) {
  // Weavy
  return await sign(
    {
      iss: WEAVY_CLIENT_ID,
      exp: new Date().getTime() + 120 * 1000, // expiration date, required, in ms, absolute to 1/1/1970
      sub: sub,
      email: email,
      name: name,
      picture: photoURL,
    }, // body
    WEAVY_SECRET, // secret
    {
      alg: 'HS256',
    },
  )
    .then(x => x) // token as the only argument
    .catch(console.error); // possible errors
}

//generates a master weavy jwt token
async function generateAPIJWT() {
  // Weavy
  return await sign(
    {
      iss: 'weavy',
      client_id: WEAVY_CLIENT_ID,
      exp: new Date().getTime() + 120 * 1000,
      sub: WEAVY_CLIENT_ID,
    }, // body
    WEAVY_SECRET, // secret
    {
      alg: 'HS256',
    },
  )
    .then(x => x) // token as the only argument
    .catch(console.error); // possible errors
}

// // logs the user in with a JWT token
// async function weavyAuth(sub, email, name, photoURL) {
//   var token = await generateJWT(sub, email, name, photoURL);
//   if (!token) {
//     return;
//   }
//   fetch(API_URL + '/client/sign-in', {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer ' + token,
//     },
//   })
//     .then(res => res.json())
//     .then(weavyUser => {
//       // connect();
//       weavyLogin(weavyUser);
//     })
//     .catch(console.error); // possible errors;
// }

export {generateAPIJWT, generateJWT};
