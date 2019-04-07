import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions,
    createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import OngoingActivityScreen from '../screens/OngoingActivityScreen';
import EndActivityScreen from '../screens/EndActivityScreen';
import CameraScreen from '../screens/CameraScreen';
import ActivityHistoryScreen from '../screens/ActivityHistoryScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';

let NavigationService = class NavigationService {
    getTopNavigator() {
        return (
            <TopLevelNavigator
                ref={navigatorRef => {
                    this._navigator = navigatorRef;
                }}
            />
        );
    }

    navigate(routeName, params) {
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }
}

const navigationService = new NavigationService();
export default navigationService;


const ActivityNav = createStackNavigator(
    {
        Home: HomeScreen,
        OngoingActivityScreen: OngoingActivityScreen,
        EndActivityScreen: EndActivityScreen,
        CameraScreen: CameraScreen,
    },
)

const DetailNav = createStackNavigator(
    {
        ActivityHistoryScreen: ActivityHistoryScreen,
        ActivityDetailScreen: ActivityDetailScreen
    }
)

const TabNavigator = createBottomTabNavigator(
    {
        Home: ActivityNav,
        ActivityHistoryScreen: {
            screen: DetailNav,
            navigationOptions: {
                title: 'Activity History'
            }
        },
        RewardsScreen: RewardsScreen
    },
    {
        initialRouteName: 'Home'
    }
)

ActivityNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    }
}

DetailNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    }
}



const TopLevelNavigator = createAppContainer(TabNavigator);