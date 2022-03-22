import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// import Weavy

import UserProvider from './weavy/weavy-user-provider';
import ConnectionProvider from './weavy/weavy-connection-provider';
import WeavyChat from './weavy/weavy-chat';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <UserProvider>
        <ConnectionProvider>
          <WeavyChat />
        </ConnectionProvider>
      </UserProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

export default App;
