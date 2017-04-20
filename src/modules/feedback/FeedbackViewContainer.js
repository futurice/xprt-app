import { connect } from 'react-redux';
import FeedbackView from './FeedbackView';
import rest from '../../utils/rest';

export default connect(
  () => ({}),
  dispatch => ({
    sendFeedback(feedback) {
      dispatch(rest.actions.feedback.post({}, {
        body: JSON.stringify({ text: feedback }),
      }));
    },
  }),
)(FeedbackView);
