import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {API_URL} from './weavy-constants';

class WeavyWebView extends Component {
  render() {
    return (
      <>
        <WebView
          source={{uri: API_URL + this.props.path}}
          sharedCookiesEnabled={true}
        />
      </>
    );
  }
}

export default WeavyWebView;
