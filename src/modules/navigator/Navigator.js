import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import ExpertsViewContainer from '../experts/ExpertsViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Experts: {screen: ExpertsViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'XPRT',
  header: {
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 0 // disable header elevation when TabNavigator visible
    }
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator}
});

export default AppNavigator;
