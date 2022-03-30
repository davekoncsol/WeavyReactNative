import {sign} from 'react-native-pure-jwt';
import {API_URL} from './weavy-constants';

//const axios = require('axios');
const WEAVY_CLIENT_ID = 'clientid';
const WEAVY_SECRET = 'clientsecret';

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



export {generateAPIJWT, generateJWT};
