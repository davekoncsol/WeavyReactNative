import {API_URL} from './weavy-constants';

async function getUserAccessToken(uid, email, name, photoURL) {
  var user = uid;

  // Weavy API Key
  var apiKey = 'wys_XQ1H9Q9K4jLnwOBXCcOF6R1tsH3g5b3I0NN1';
  // This should be placed in the backend
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${apiKey}`);

  var raw = JSON.stringify({
    directory: 'newdirectory',
    name: name,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return await fetch(`${API_URL}/api/users/${user}/tokens`, requestOptions)
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(result => result.access_token)
    .catch(error => {
      console.error(error);
    });
}

async function weavyAuth(sub, email, name, photoURL) {
  var accessToken = await getUserAccessToken(sub, email, name, photoURL);
  if (!accessToken) {
    return;
  }
  return await fetch(API_URL + '/dropin/client/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(res => {
      // console.log(res);
      return res.json();
    })
    .catch(error => console.error(error));
}

export {getUserAccessToken, weavyAuth};
