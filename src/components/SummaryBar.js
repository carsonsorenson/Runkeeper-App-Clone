import React, { Component } from 'react';
import {formatValue, formatDistance} from './Calculations';
import { Text } from 'native-base';
import { View } from 'react-native';
import styles from '../styles/activityStyles';

export default class SummaryBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.summaryContainer}>
                <View style={styles.summary}>
                    <Text>
                        {formatDistance(this.props.distance)}
                    </Text>
                </View>
                <View style={styles.summary}>
                    <Text>
                        {formatValue(this.props.time)}
                    </Text>>
                </View>
                <View style={styles.summary}>
                    <Text>
                        {formatValue(this.props.pace)}
                    </Text>
                </View>
            </View>
        )
    }
}