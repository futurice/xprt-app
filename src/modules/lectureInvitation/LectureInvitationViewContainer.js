import { connect } from 'react-redux';

import LectureInvitationView from './LectureInvitationView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    expert: state.expertDetails.data,
    loading: state.expertDetails.loading,
    expertId: ownProps.navigation.state.params.expertId,
  }),
  dispatch => ({
    getExperts(expertId) {
      dispatch(rest.actions.expertDetails({ expertId }));
    },
  }),
)(LectureInvitationView);
