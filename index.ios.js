import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

class XPRT extends Component {
  componentDidMount() {
    console.log(SplashScreen);
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 800,
      delay: 300,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('XPRT', () => XPRT);
