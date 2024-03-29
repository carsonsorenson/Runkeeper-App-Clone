import React, { Component } from 'react';
import {formatValue, formatDistance} from './Calculations';
import { H3, Text } from 'native-base';
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
                    <Text style={styles.summaryText}>
                        {formatDistance(this.props.distance)}
                    </Text>
                    <H3>
                        Miles
                    </H3>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>
                        {formatValue(this.props.time)}
                    </Text>
                    <H3>
                        Time
                    </H3>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>
                        {formatValue(this.props.pace)}
                    </Text>
                    <H3>
                        Min/mi
                    </H3>
                </View>
            </View>
        )
    }
}
