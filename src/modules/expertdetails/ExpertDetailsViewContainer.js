import {connect} from 'react-redux';
import ExpertDetailsView from './ExpertDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    expert: state.expertDetails.data,
    loading: state.expertDetails.loading,
    expertId: ownProps.navigation.state.params.expertId
  }),
  dispatch => ({
    getExpertDetails(expertId) {
      dispatch(rest.actions.expertDetails({expertId}));
    }
  })
)(ExpertDetailsView);
