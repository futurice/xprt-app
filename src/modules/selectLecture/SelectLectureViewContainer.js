import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import SelectLectureView from './SelectLectureView';
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
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }),
)(SelectLectureView);
