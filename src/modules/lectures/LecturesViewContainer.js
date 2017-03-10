import {connect} from 'react-redux';
import LecturesView from './LecturesView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    lectures: state.getIn(['lectures', 'data']).toJS()
  }),
  dispatch => ({
    getLectures() {
      dispatch(rest.actions.lectures());
    }
  }))(LecturesView);
