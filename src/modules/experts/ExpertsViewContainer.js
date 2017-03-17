import {connect} from 'react-redux';
import ExpertsView from './ExpertsView';
import rest from '../../utils/rest';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

export default connect(
  state => ({
    experts: state.experts.data,
    loading: state.experts.loading
  }),
  dispatch => ({
    getExperts(query) {
      dispatch(rest.actions.experts({filter: query}));
    },
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  })
)(ExpertsView);
