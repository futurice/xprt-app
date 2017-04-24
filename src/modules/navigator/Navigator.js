import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ExpertsView from '../experts/ExpertsView';
import ExpertDetailsView from '../expertdetails/ExpertDetailsView';
import LecturesView from '../lectures/LecturesView';
import LectureDetailsView from '../lectureDetails/LectureDetailsView';
import TeacherProfile from '../teachers/TeacherProfileView';
import SelectLectureView from '../selectLecture/SelectLectureView';
import LectureInvitationView from '../lectureInvitation/LectureInvitationView';
import FeedbackView from '../feedback/FeedbackView';
import EditProfileView from '../editProfile/EditProfileView';

const headerColor = '#333333';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Experts: { screen: ExpertsView },
  Lectures: { screen: LecturesView },
  TeacherProfile: { screen: TeacherProfile },
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: { backgroundColor: activeColor },
        style: { backgroundColor: headerColor },
      },
    }),
  },
});

MainScreenNavigator.navigationOptions = {
  title: 'XPRT',
  header: {
    titleStyle: { color: '#15a369' },
    style: {
      backgroundColor: headerColor,
      elevation: 0, // disable header elevation when TabNavigator visible
    },
  },
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: { screen: MainScreenNavigator },
  ExpertDetails: { screen: ExpertDetailsView },
  LectureDetails: { screen: LectureDetailsView },
  TeacherProfile: { screen: TeacherProfile },
  SelectLecture: { screen: SelectLectureView },
  LectureInvitation: { screen: LectureInvitationView },
  Feedback: { screen: FeedbackView },
  EditProfile: { screen: EditProfileView },
});

export default AppNavigator;
