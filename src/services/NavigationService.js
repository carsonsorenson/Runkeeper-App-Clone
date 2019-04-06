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
import TestScreen from '../screens/TestScreen';

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


const StackNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        OngoingActivityScreen: OngoingActivityScreen,
        EndActivityScreen: EndActivityScreen,
        CameraScreen: CameraScreen,
    },
)

const TabNavigator = createBottomTabNavigator(
    {
        Home: StackNavigator,
        TestScreen: TestScreen,
    },
    {
        initialRouteName: 'Home'
    }
)

StackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    }
}


const TopLevelNavigator = createAppContainer(TabNavigator);