import React from 'react';
import {View} from 'react-native';
import WeavyWebView from '../weavy/weavy-webview';
import styles from '../weavy/weavy-styles';

const Chat = props => {
  return (
    <View style={styles.weavy}>
      <WeavyWebView path={props.path} user={props.user} />
    </View>
  );
};

export default Chat;
