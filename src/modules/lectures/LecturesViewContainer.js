import {connect} from 'react-redux';
import LecturesView from './LecturesView';
import rest from '../../utils/rest';
import {NavigationActions} from 'react-navigation';
import {bindActionCreators} from 'redux';



export default connect(
  state => ({
    lectures: state.getIn(['lectures', 'data']).toJS(),
  }),
  dispatch => ({
    getLectures() {
      dispatch(rest.actions.lectures());
    },
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }))(LecturesView);
