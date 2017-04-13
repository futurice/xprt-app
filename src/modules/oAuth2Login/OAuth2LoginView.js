import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class OAuth2LoginView extends Component {
  static navigationOptions = {
    header: () => ({
      style: {
        backgroundColor: '#333333',
      },
      titleStyle: {
        color: '#15a369',
      },
      tintColor: '#15a369',
    }),
  };
  render() {
    return (
      <WebView
        source={{ uri: 'https://xprt-backend.herokuapp.com/oauth2/callback' }}
      />
    );
  }
}
