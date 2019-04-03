import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H3 } from 'native-base';
import styles from '../styles/activityStyles';

export default class Distance extends Component {
    constructor(props) {
        super(props)
    }

    formatDistance(distance) {
        return distance.toFixed(2);
    }

    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.formatDistance(this.props.distance)}
                </Text>
                <H3 style={{alignSelf: 'center'}}>
                    Miles
                </H3>
            </View>
        )
    }
}