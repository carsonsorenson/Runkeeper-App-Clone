import React, { Component } from 'react';
import { View } from 'react-native';
import LevelAward from '../components/LevelAward';

export default class RewardsScreen extends Component {
    static navigationOptions = {
        title: 'Rewards',
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <LevelAward />
            </View>
        )
    }
}