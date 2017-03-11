import {connect} from 'react-redux';
import ExpertsView from './ExpertsView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    experts: state.getIn(['experts', 'data']).toJS()
  }),
  dispatch => ({
    getExperts(queryString) {
      console.log('kutsu');
      dispatch(rest.actions.experts(queryString));
    }
  })
)(ExpertsView);
