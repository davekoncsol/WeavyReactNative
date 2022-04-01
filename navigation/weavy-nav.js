import React, {useContext, useState} from 'react';
import {Icon} from 'react-native-elements';

// import Weavy
import Chat from '../screens/weavy-chat';
import LoginScreen from '../screens/weavy-login';
import {generateJWT} from '../weavy/weavy-service';
import UserContext from '../weavy/weavy-user-context';
import ConnectionContext from '../weavy/weavy-connection-context';
import {API_URL} from '../weavy/weavy-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const WeavyNav = props => {
  const {weavyLogin, weavyUser} = useContext(UserContext);
  const {connect, notificationCount} = useContext(ConnectionContext);
  const [path, setPath] = useState('/e/messenger');

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
        connect(token);
        weavyLogin(user);
        setPath('/e/messenger?' + user.id);
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
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Chat') {
                iconName = focused ? 'chat' : 'chat-bubble';
              } else if (route.name === 'Account') {
                iconName = focused ? 'login' : 'logout';
              }
              // You can return any component that you like here!
              return <Icon name={iconName} type="material" color={color} />;
            },
            tabBarActiveTintColor: '#156B93',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Chat"
            children={() => <Chat path={path} />}
            options={{
              tabBarBadge: notificationCount > 0 ? notificationCount : null,
            }}
          />
          <Tab.Screen
            name="Account"
            children={() => <LoginScreen loginWeavy={loginWeavy} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default WeavyNav;