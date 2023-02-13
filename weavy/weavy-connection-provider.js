/* eslint-disable prettier/prettier */
import React from 'react';
import ConnectionContext from './weavy-connection-context';
import signalr from 'react-native-signalr';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {useState} from 'react';
import {API_URL} from './weavy-constants';

const ConnectionProvider = props => {

  const [proxy, setProxy] = useState(null);
  const [notificationCount, setNotificationCount] = useState(null);


  const connect = token => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.None)
      .withUrl(API_URL + '/hubs/rtm', {
        accessTokenFactory: ()=>token,
      })
      .withAutomaticReconnect()
      .build();

    this.isConnectionStarted = connection.start();
      //console.log(connection, "super");
      connection.invoke('AddToGroup', 'Typing');
      connection.on('Typing', function(e, data){console.log('wower',e, data);});
    connection.onclose(error =>
      console.log(this.EVENT_CLOSE, error),
    );
    connection.onreconnecting(error =>
      console.log(this.EVENT_RECONNECTING, error),
    );
    connection.onreconnected(connectionId =>
      console.log(this.EVENT_RECONNECTED, connectionId),
    );
  };

  return (
    <ConnectionContext.Provider
      value={{
        proxy,
        connect,
        notificationCount,
      }}>
      {props.children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
