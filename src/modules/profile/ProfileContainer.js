import React, { Component } from 'react';
import { Icon } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { storeToken } from '../login/Login';
import ProfileView from './ProfileView';
import LoginNag from '../../components/LoginNag';
import fetchDevToken from '../../services/devLogin';

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
export default class ProfileContainer extends Component {
  static navigationOptions = {
    title: 'My profile',
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
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

    if (isLoggedIn) {
      return (
        <ProfileView />
      );
    }

    return (
      <LoginNag
        devLogin={devLogin}
        openLogin={() => this.open('Login')}
        text="You have to be logged in to view and manage your profile and collaborations"
      />
    );
  }
}
