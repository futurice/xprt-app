import { connect } from 'react-redux';

import LectureInvitationView from './LectureInvitationView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    expert: ownProps.navigation.state.params.expert,
    loading: state.expertDetails.loading,
  }),
  dispatch => ({
    getExperts(expertId) {
      dispatch(rest.actions.expertDetails({ expertId }));
    },
  }),
)(LectureInvitationView);
