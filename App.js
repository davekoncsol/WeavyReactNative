import React, {useContext} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

// import Weavy
import WeavyWebView from './weavy/weavy-webview';
import {generateJWT} from './weavy/weavy-service';
import UserProvider from './weavy/weavy-user-provider';
import UserContext from './weavy/weavy-user-context';
import {API_URL} from './weavy/weavy-constants';
import ConnectionProvider from './weavy/weavy-connection-provider';

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  const {weavyLogin, weavyUser} = useContext(UserContext);

  async function weavyAuth(sub, email, name, photoURL) {
    var token = await generateJWT(sub, email, name, photoURL);
    if (!token) {
      return;
    }
    fetch(API_URL + '/client/sign-in', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(user => {
        // connect();
        weavyLogin(weavyUser);
      })
      .catch(console.error); // possible errors;
  }

  const loginWeavy = () => {
    weavyAuth('sub1', 'dave1@email.com', 'Dave Weavy', null);
  };

  return (
    <UserProvider>
      <ConnectionProvider>
      <SafeAreaView style={backgroundStyle}>
        <Button
          onPress={loginWeavy}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={styles.weavy}>
          <WeavyWebView path={'/e/messenger'} />
        </View>
      </SafeAreaView>
      </ConnectionProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  weavy: {
    flex: 1,
  },
});

export default App;
