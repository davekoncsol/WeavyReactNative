/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import Weavy
import WeavyWebView from './weavy/weavy-webview';
import {generateJWT} from './weavy/weavy-service';
import UserProvider from './weavy/weavy-user-provider';
import UserContext from './weavy/weavy-user-context';
import {API_URL} from './weavy/weavy-constants';
//import ConnectionProvider from './weavy/weavy-connection-provider';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {weavyLogin, weavyUser} = useContext(UserContext);


  async function weavyAuth(sub, email, name, photoURL) {
    console.log('fun');
    var token = await generateJWT(sub, email, name, photoURL);
    console.log(token, 'token');
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
    console.log('running');
    weavyAuth('sub1', 'dave1@email.com', 'Dave Weavy', null);
  };
  return (
    <UserProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Button
            onPress={loginWeavy}
            title="Login"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <View style={{height: 800}}>
            <WeavyWebView path={'/e/messenger'} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
