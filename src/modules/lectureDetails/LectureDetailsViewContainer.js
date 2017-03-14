import {connect} from 'react-redux';
import LectureDetailsView from './LectureDetailsView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    lectureDetails: state.getIn(['lectureDetails', 'data']).toJS()
  }),
  dispatch => ({
    getLectureDetails(lectureId) {
      dispatch(rest.actions.lectureDetails({lectureId}));
    }
  }))(LectureDetailsView);
