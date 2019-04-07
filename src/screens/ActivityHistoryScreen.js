import React, { Component } from 'react';
import { Text } from 'react-native';
import ActivityHistoryList from '../components/ActivityHistoryList';

export default class ActivityHistoryScreen extends Component {
    static navigationOptions = {
        title: 'Activity History',
    }

    constructor(props) {
        super(props)

        this.state = {
            list: true
        }
    }

    renderTimeLine() {
        return (
            <Text>
                Hey
            </Text>
        )
    }

    renderList() {
        return (
            <ActivityHistoryList />
        )
    }

    render() {
        return (
            this.state.list ? this.renderList() : this.renderTimeLine()
        )
    }
}