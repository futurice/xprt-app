import { connect } from 'react-redux';
import TeacherProfile from './TeacherProfile';
import rest from '../../utils/rest';

export default connect(
  state => ({
    teacher: state.teacherDetails.data,
  }),
  dispatch => ({
    getTeacher(teacherId) {
      dispatch(rest.actions.teacherDetails({ teacherId }));
    },
  }),
)(TeacherProfile);
