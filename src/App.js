import React, {Component} from 'react';
import {Alert} from 'react-native';
import navigationService from './services/NavigationService';
import { Provider } from 'react-redux';
import store from './redux/store/ReduxStore';

export default class App extends Component {
    extraCredit() {
        Alert.alert(
            'I implemented the following extra credit',
            '(10 pts) Add an elevation tracker to your activity'
        );
    }

    render() {
        return (
            <Provider store={store}>
                {this.extraCredit()}
                {navigationService.getTopNavigator() }
            </Provider>
        );
    }
}
