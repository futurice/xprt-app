import { connect } from 'react-redux';
import TeacherProfileView from './TeacherProfileView';
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
)(TeacherProfileView);
