import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import TodoScreen from '../screen/TodoScreen';
import ProfileScreen from '../screen/ProfileScreen';

const {Navigator, Screen} = createBottomTabNavigator();
const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;
const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({navigation, state}: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="HOME" icon={HomeIcon} />
    <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    initialRouteName="Todo"
    screenOptions={{headerShown: false}}
    tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Todo" component={TodoScreen} />
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);

const BottomTab = () => <TabNavigator />;

export default BottomTab;
