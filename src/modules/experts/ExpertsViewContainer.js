import {connect} from 'react-redux';
import ExpertsView from './ExpertsView';
import rest from '../../utils/rest';

export default connect(
  state => ({
    experts: state.getIn(['experts', 'data']).toJS()
  }),
  dispatch => ({
    getExperts() {
      dispatch(rest.actions.experts());
    }
  })
)(ExpertsView);
