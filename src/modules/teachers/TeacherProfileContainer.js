import { connect } from 'react-redux';
import TeacherProfileView from './TeacherProfileView';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';


export default connect(
  state => ({
    teacher: state.teacherDetails.data,
  }),
  dispatch => ({
    getTeacher(teacherId) {
      dispatch(rest.actions.teacherDetails({ teacherId }));
    },
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  }),
)(TeacherProfileView);
