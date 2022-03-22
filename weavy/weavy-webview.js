import React, {Component, useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {API_URL} from './weavy-constants';

const WeavyWebView = props => {
  return (
    <WebView
      source={{uri: API_URL + props.path}}
      sharedCookiesEnabled={true}
      weavyUser={props.weavyUser}
    />
  );
};

export default WeavyWebView;
