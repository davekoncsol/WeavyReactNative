import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// import Weavy
import WeavyWebView from './weavy/weavy-webview';
import {generateJWT} from './weavy/weavy-service';
import UserProvider from './weavy/weavy-user-provider';
import UserContext from './weavy/weavy-user-context';
import {API_URL} from './weavy/weavy-constants';
import ConnectionProvider from './weavy/weavy-connection-provider';

const App = () => {
  const {weavyLogin, weavyUser} = useContext(UserContext);
  const [path, setPath] = useState('/');
  const [selectedValue, setSelectedValue] = useState(null);

  function setWeavyUser(user) {
    weavyLogin(user);
    setPath('/e/messenger/');
    setPath('/e/messenger');
  }
  async function weavyAuth(sub, email, name, photoURL) {
    var token = await generateJWT(sub, email, name, photoURL);
    if (!token) {
      return;
    }
    return fetch(API_URL + '/client/sign-in', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(user => {
        //connect();
        console.log(user);
        setWeavyUser(user);
        // setWeavyToken(token);
      })
      .catch(console.error); // possible errors;
  }
  var users = {
    dave: {
      sub: 'dave',
      email: 'daveweavy@email.com',
      name: 'Dave Weavy',
    },
    mai: {
      sub: 'mai',
      email: 'maiweavy@email.com',
      name: 'Mai Weavy',
    },
    allen: {
      sub: 'allen',
      email: 'allenweavy@email.com',
      name: 'Allen Weavy',
    },
  };
  function loginWeavy(user) {
    user
      ? weavyAuth(users[user].sub, users[user].email, users[user].name, null)
      : console.log('nouser');
  }

  return (
    <UserProvider>
      <ConnectionProvider>
        <SafeAreaView style={styles.backgroundStyle}>
          <View style={styles.container}>
            {/* <Button
              style={styles.button}
              onPress={loginWeavy(selectedVale)}
              title="Login"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            /> */}
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                loginWeavy(itemValue);
              }}>
              <Picker.Item label="Dave" value="dave" />
              <Picker.Item label="Mai" value="mai" />
            </Picker>
          </View>
          <View style={styles.weavy}>
            <WeavyWebView path={path} />
          </View>
        </SafeAreaView>
      </ConnectionProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  weavy: {
    flex: 3,
  },
  button: {
    flex: 1,
  },
  picker: {
    flex: 1,
  },
  backgroundStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
