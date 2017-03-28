import { connect } from 'react-redux';

import LectureDetailsView from './LectureDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    lecture: state.lectureDetails.data,
    loading: state.lectureDetails.loading,
    lectureId: ownProps.navigation.state.params.lectureId,
  }),
  dispatch => ({
    getLectureDetails(lectureId) {
      dispatch(rest.actions.lectureDetails({ lectureId }));
    },
  }))(LectureDetailsView);
