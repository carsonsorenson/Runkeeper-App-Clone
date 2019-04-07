import React, { Component } from 'react';
import { Container } from 'native-base';
import { ScrollView, View } from 'react-native';
import LevelAward from '../components/LevelAward';
import PersonalBests from '../components/PersonalBests';
import SpeedAward from '../components/SpeedAward';

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
                <ScrollView>
                    <LevelAward />
                    <PersonalBests />
                    <SpeedAward />
                </ScrollView>
            </View>
        )
    }
}