import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import LoginView from './LoginView';

export default connect(() => ({}),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }))(LoginView);
