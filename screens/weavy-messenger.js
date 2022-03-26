import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import WeavyWebView from '../weavy/weavy-webview';

const Messenger = props => {
  return (
    <View style={styles.weavy}>
      <WeavyWebView path={props.path} />
    </View>
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
export default Messenger;
