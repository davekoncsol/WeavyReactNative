import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// import Weavy
import WeavyWebView from './weavy-webview';
import {generateJWT} from './weavy-service';
import UserContext from './weavy-user-context';
import ConnectionContext from './weavy-connection-context';
import {API_URL} from './weavy-constants';

const WeavyChat = props => {
  const {weavyLogin, weavyUser} = useContext(UserContext);
  const {connect} = useContext(ConnectionContext);
  const [path, setPath] = useState('/');
  const [selectedValue, setSelectedValue] = useState(null);

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
        connect();
        weavyLogin(user);
        setPath('/e/messenger?' + user.id);
        console.log(path, 'path');
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
    <>
      <View style={styles.container}>
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
    </>
  );
};

const styles = StyleSheet.create({
  weavy: {
    flex: 5,
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
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default WeavyChat;
