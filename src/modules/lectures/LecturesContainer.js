import React, { Component } from 'react';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import LoginNag from '../../components/LoginNag';
import { storeToken } from '../login/Login';
import fetchDevToken from '../../services/devLogin';

import LecturesView from './LecturesView';

const mapStateToProps = state => ({
  isLoggedIn: !!state.login.token,
});
const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  devLogin: async () => {
    const token = await fetchDevToken();
    dispatch(storeToken(token));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LecturesContainer extends Component {
  static navigationOptions = {
    title: 'My lectures',
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-list" style={{ color }} />
      ),
      visible: true,
    }),
  };

  open = (routeName) => {
    const { navigate } = this.props;
    navigate({ routeName });
  };

  render() {
    const { isLoggedIn, devLogin } = this.props;

    if (!isLoggedIn) {
      return (
        <LoginNag
          devLogin={devLogin}
          openLogin={() => this.open('Login')}
          text="You have to be logged in to view and manage your lectures"
        />
      );
    }

    return (
      <LecturesView />
    );
  }
}
