import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H3 } from 'native-base';
import styles from '../styles/activityStyles';

export default class Timer extends Component {
    constructor(props) {
        super(props)
    }

    formatTime(time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        var seconds = time - (hours * 3600) - (minutes * 60);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (hours >= 1) {
            return hours + ':' + minutes + ':' + seconds;
        }
        else {
            return minutes + ':' + seconds;
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.formatTime(this.props.time)}
                </Text>
                <H3 style={{alignSelf: 'center'}}>
                    Time
                </H3>
            </View>
        )
    }
}