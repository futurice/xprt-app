import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import ExpertDetailsView from './ExpertDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    expert: state.expertDetails.data,
    loading: state.expertDetails.loading,
    expertId: ownProps.navigation.state.params.expertId,
  }),
  dispatch => ({
    getExpertDetails(expertId) {
      dispatch(rest.actions.expertDetails({ expertId }));
    },
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }),
)(ExpertDetailsView);
