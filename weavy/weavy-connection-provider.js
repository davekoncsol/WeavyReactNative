import React from 'react';
import ConnectionContext from './weavy-connection-context';
import signalr from 'react-native-signalr';
import {useState} from 'react';
import {API_URL} from './weavy-constants';

const ConnectionProvider = props => {
  const [proxy, setProxy] = useState(null);
  const connect = () => {
    console.log('provider');
    const connection = signalr.hubConnection(API_URL);
    connection.logging = true;
    console.log('connection', connection);
    const hubProxy = connection.createHubProxy('rtm');
    hubProxy.on('init', (type, data) => {
      console.log('init', data);
    }); // dummy event to get signalR started...
    setProxy(hubProxy);
    // atempt connection, and handle errors
    if (connection) {
      connection
        .start()
        .done(() => {
          console.log('Now connected, connection ID=' + connection.id);
        })
        .fail(() => {
          console.log('Failed');
        });

      hubProxy.on('eventReceived', (type, data) => {
        console.log('data', data);
        console.log('type', type);
      });
      //connection-handling
      connection.connectionSlow(() => {
        console.log(
          'We are currently experiencing difficulties with the connection.',
        );
      });

      connection.error(error => {
        const errorMessage = error.message;
        let detailedError = '';
        if (error.source && error.source._response) {
          detailedError = error.source._response;
        }
        if (
          detailedError ===
          'An SSL error has occurred and a secure connection to the server cannot be made.'
        ) {
          console.log(
            'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14',
          );
        }
        console.debug('SignalR error: ' + errorMessage, detailedError);
      });
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
