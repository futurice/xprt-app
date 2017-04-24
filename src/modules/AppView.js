import React, { PropTypes, Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { StyleProvider } from 'native-base';
import { connect } from 'react-redux';

import getTheme from '../../native-base-theme/components';
import themeVariables from '../../native-base-theme/variables/platform';

import NavigatorView from './navigator/NavigatorView';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

import styles from './appViewStyles';

const mapStateToProps = state => ({
  isReady: state.session.isReady,
});

@connect(mapStateToProps)
class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then((snapshot) => {
        const { dispatch } = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <StyleProvider style={getTheme(themeVariables)}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#455a64" barStyle="light-content" />
          <NavigatorView />

          {__DEV__ && <DeveloperMenu />}
        </View>
      </StyleProvider>
    );
  }
}

export default AppView;
