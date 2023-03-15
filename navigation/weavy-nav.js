import React, {useContext, useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';

// import Weavy
import Chat from '../screens/weavy-chat';
import LoginScreen from '../screens/weavy-login';
import {weavyAuth} from '../weavy/weavy-service';
import UserContext from '../weavy/weavy-user-context';
import ConnectionContext from '../weavy/weavy-connection-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const WeavyNav = props => {
  const {connect, notificationCount} = useContext(ConnectionContext);
  const [path, setPath] = useState('/dropin/messenger/8');
  const [user, setUser] = useState(null);
  const {weavyLogin} = useContext(UserContext);

  const Tab = createBottomTabNavigator();
  var users = {
    dave: {
      uid: 'dave',
      email: 'dave@weavy.com',
      name: 'Dave Weavy',
    },
    mai: {
      uid: 'mai',
      email: 'maiweavy@email.com',
      name: 'Mai Weavy',
    },
    allen: {
      uid: 'allen',
      email: 'allenweavy@email.com',
      name: 'Allen Weavy',
    },
  };
  function loginWeavy(user1) {
    setUser(user1);
  }
  useEffect(() => {
    if (user !== null) {
      weavyAuth(users[user].uid, users[user].email, null, null)
        .then(userW => {
          weavyLogin(userW);
          setPath('/dropin/messenger/?' + userW.id);
          connect(userW.accessToken);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [user]);

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
