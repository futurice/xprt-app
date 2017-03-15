import {connect} from 'react-redux';
import ExpertDetailsView from './ExpertDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    expertDetails: state.getIn(['expertDetails']).toJS(),
    expertId: ownProps.navigation.state.params.expertId
  }),
  dispatch => ({
    getExpertDetails(expertId) {
      dispatch(rest.actions.expertDetails({expertId}));
    }
  })
)(ExpertDetailsView);
