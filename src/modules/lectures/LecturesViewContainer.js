import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import LecturesView from './LecturesView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    lectures: state.lectures.data,
    loading: state.lectures.loading,
  }),
  dispatch => ({
    getLectures() {
      dispatch(rest.actions.lectures());
    },
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }))(LecturesView);
