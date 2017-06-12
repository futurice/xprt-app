import React, { Component } from 'react';
import { Icon, DeviceInfo } from 'native-base';
import { WebView } from 'react-native';
import jwtDecode from 'jwt-decode';

import { createAction, createReducer } from 'redux-act';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Cookie from 'react-native-cookie';

const oauth2Url = 'https://xprt-backend.herokuapp.com/oauth2/callback';

// Action creators
export const storeToken = createAction('Store login token');
export const clearToken = createAction('Clear login token');

// Initial state
const initialState = {
  token: null,
  decoded: {},
};

// Reducer
export const reducer = createReducer({
  [storeToken]: (state, payload) => ({
    ...state,
    token: payload,
    decoded: jwtDecode(payload),
  }),
  [clearToken]: () => initialState,
}, initialState);

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  storeToken: token => dispatch(storeToken(token)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FormExample extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-key-outline" style={{ color }} />
      ),
      visible: true,
    }),
  };

  state = {
    url: '',
  }

  componentDidMount() {
    Cookie.clear()
    .then(() => this.setState({ url: oauth2Url }));
  }

  doLogin = (data) => {
    const token = JSON.parse(data).token;
    this.props.storeToken(token);
    this.props.back();
  };

  render() {
    return (
      <WebView
        userAgent={'XPRT - Android'}
        onMessage={e => this.doLogin(e.nativeEvent.data)}
        javaScriptEnabled
        source={{ uri: this.state.url }}
      />
    );
  }
}
