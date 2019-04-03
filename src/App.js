/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import navigationService from './services/NavigationService';
import { Provider } from 'react-redux';
import store from './redux/store/ReduxStore';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {navigationService.getTopNavigator() }
            </Provider>
        );
    }
}
