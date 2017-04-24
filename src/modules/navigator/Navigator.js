import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ExpertsViewContainer from '../experts/ExpertsViewContainer';
import ExpertDetailsViewContainer from '../expertdetails/ExpertDetailsViewContainer';
import LecturesViewContainer from '../lectures/LecturesViewContainer';
import LectureDetailsViewContainer from '../lectureDetails/LectureDetailsViewContainer';
import LoginView from '../login/LoginView';
import TeacherProfileContainer from '../teachers/TeacherProfileContainer';
import SelectLectureViewContainer from '../selectLecture/SelectLectureViewContainer';
import LectureInvitationViewContainer from '../lectureInvitation/LectureInvitationViewContainer';
import FeedbackViewContainer from '../feedback/FeedbackViewContainer';
import OAuth2LoginViewContainer from '../oAuth2Login/OAuth2LoginViewContainer';
import EditProfileViewContainer from '../editProfile/EditProfileViewContainer';

const headerColor = '#333333';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Experts: { screen: ExpertsViewContainer },
  Lectures: { screen: LecturesViewContainer },
  Login: { screen: LoginView },
  TeacherProfile: { screen: TeacherProfileContainer },
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
  ExpertDetails: { screen: ExpertDetailsViewContainer },
  LectureDetails: { screen: LectureDetailsViewContainer },
  TeacherProfile: { screen: TeacherProfileContainer },
  SelectLecture: { screen: SelectLectureViewContainer },
  LectureInvitation: { screen: LectureInvitationViewContainer },
  Feedback: { screen: FeedbackViewContainer },
  OAuth2Login: { screen: OAuth2LoginViewContainer },
  EditProfile: { screen: EditProfileViewContainer },
});

export default AppNavigator;
