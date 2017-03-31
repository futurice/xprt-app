import { connect } from 'react-redux';
import TeacherProfile from './TeacherProfile';
import rest from '../../utils/rest';

export default connect(
  state => ({}),
  dispatch => ({
    getTeacher(query) {
      dispatch(rest.actions.teachers({ filter: query }));
    },
  }),
)(TeacherProfile);
