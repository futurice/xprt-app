import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ExpertsViewContainer from '../experts/ExpertsViewContainer';
import ExpertDetailsViewContainer from '../expertdetails/ExpertDetailsViewContainer';
import LecturesViewContainer from '../lectures/LecturesViewContainer';
import LectureDetailsViewContainer from '../lectureDetails/LectureDetailsViewContainer';
import LoginViewContainer from '../login/LoginViewContainer';

const headerColor = '#333333';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Experts: { screen: ExpertsViewContainer },
  Lectures: { screen: LecturesViewContainer },
  Login: { screen: LoginViewContainer },
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
});

export default AppNavigator;
