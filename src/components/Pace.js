import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H3 } from 'native-base';
import styles from '../styles/activityStyles';

export default class Pace extends Component {
    constructor(props) {
        super(props)
    }

    formatPace(pace) {
        return pace.toFixed(2);
    }

    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.formatPace(this.props.pace)}
                </Text>
                <H3 style={{alignSelf: 'center'}}>
                    Pace
                </H3>
            </View>
        )
    }
}