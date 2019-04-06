import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions
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

const Root = createStackNavigator(
    {
        Home: HomeScreen,
        OngoingActivityScreen: OngoingActivityScreen,
        EndActivityScreen: EndActivityScreen,
        CameraScreen: CameraScreen,
        TestScreen: TestScreen
    },
    {
        initialRouteName: 'Home'
    }
)

const TopLevelNavigator = createAppContainer(Root);