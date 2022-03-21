import React from 'react';
import ConnectionContext from './weavy-connection-context';
import {hubConnection} from 'react-native-signalr';
import {useState} from 'react';
import {API_URL} from './weavy-constants';

const ConnectionProvider = props => {
  const [proxy, setProxy] = useState(null);

  const connect = () => {
    const connection = hubConnection(API_URL);
    const hubProxy = connection.createHubProxy('rtm');
    hubProxy.on('init', (type, data) => {}); // dummy event to get signalR started...
    setProxy(hubProxy);
    hubProxy.on('event', (e, data) => {
      console.log('data', data);
    });

    if (connection) {
      connection.start();
    }
  };

  return (
    <ConnectionContext.Provider
      value={{
        proxy,
        connect,
      }}>
      {props.children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
