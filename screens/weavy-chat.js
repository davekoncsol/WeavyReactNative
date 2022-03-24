import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// import Weavy
import WeavyWebView from '../weavy/weavy-webview';
import {generateJWT} from '../weavy/weavy-service';
import UserContext from '../weavy/weavy-user-context';
import ConnectionContext from '../weavy/weavy-connection-context';
import {API_URL} from '../weavy/weavy-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChannelListMessenger} from 'stream-chat-react';

const WeavyChat = props => {
  const {weavyLogin, weavyUser} = useContext(UserContext);
  const {connect} = useContext(ConnectionContext);
  const [path, setPath] = useState('/e/messenger');
  const [selectedValue, setSelectedValue] = useState(null);

  const Tab = createBottomTabNavigator();

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

  function Messenger() {
    return (
      <View style={styles.weavy}>
        <WeavyWebView path={path} />
      </View>
    );
  }

  function LoginScreen() {
    return (
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
    );
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
         
          <Tab.Screen name="Home" component={Messenger} />
          <Tab.Screen name="Login" component={LoginScreen} />

          {/* <Tab.Screen name="Home" component={WeavyChat} /> */}
        </Tab.Navigator>
      </NavigationContainer>
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
