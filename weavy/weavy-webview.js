import React from 'react';
import {WebView} from 'react-native-webview';
import {API_URL} from './weavy-constants';

const WeavyWebView = props => {
  return (
 
    <WebView source={{uri: API_URL + props.path}} sharedCookiesEnabled={true} />
 
  );
};

export default WeavyWebView;
