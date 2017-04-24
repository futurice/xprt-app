import React, { Component } from 'react';
import { Icon } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';

import { clearToken, storeToken } from '../login/Login';
import MyProfile from '../../components/MyProfile';
import LoginNag from '../../components/LoginNag';
import fetchDevToken from '../../services/devLogin';

const mapStateToProps = state => ({
  teacher: state.teacherDetails.data,
  isLoggedIn: !!state.login.token,
});
const mapDispatchToProps = dispatch => ({
  getTeacher: teacherId => dispatch(rest.actions.teacherDetails({ teacherId })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  logout: () => dispatch(clearToken()),
  devLogin: async () => {
    const token = await fetchDevToken();
    dispatch(storeToken(token));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TeacherProfile extends Component {
  static navigationOptions = {
    title: 'My profile',
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
      ),
      visible: true,
    }),
  };

  componentDidMount() {
    // ToDo: Get ID from authentication token etc.
    this.props.getTeacher(12490);
  }

  open = (routeName) => {
    this.props.navigate({
      routeName,
    });
  };

  render() {
    const { teacher, isLoggedIn, logout, devLogin } = this.props;

    if (isLoggedIn) {
      return (
        <MyProfile
          teacher={teacher}
          open={this.open}
          doLogout={logout}
        />
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
