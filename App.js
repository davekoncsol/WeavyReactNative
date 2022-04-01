import React from 'react';
import {SafeAreaView} from 'react-native';

// import Weavy

import styles from './weavy/weavy-styles';
import UserProvider from './weavy/weavy-user-provider';
import ConnectionProvider from './weavy/weavy-connection-provider';
import WeavyNav from './navigation/weavy-nav';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <UserProvider>
        <ConnectionProvider>
          <WeavyNav />
        </ConnectionProvider>
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;
