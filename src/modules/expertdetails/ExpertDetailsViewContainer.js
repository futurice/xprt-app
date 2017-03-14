import {connect} from 'react-redux';
import ExpertDetailsView from './ExpertDetailsView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    expertDetails: state.getIn(['expertDetails', 'data']).toJS()
  }),
  dispatch => ({
    getExpert(id = 2) {
      console.log('Expertdetails API request');
      dispatch(rest.actions.expertDetails({expertId: id}));
    }
  })
)(ExpertDetailsView);
