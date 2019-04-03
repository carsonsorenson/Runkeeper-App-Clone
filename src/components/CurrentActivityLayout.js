import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H3, Button } from 'native-base';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Measurements extends Component {
    constructor(props) {
        super(props)
    }

    renderButtons() {
        if (this.props.paused) {
            return (
                <Button
                    style={[styles.rounded, {backgroundColor: 'green'}]}
                    onPress={() => this.props.play()}
                >
                    <Icon
                        name="play"
                        size={40}
                        color="#fff"
                    />
                </Button>
            )
        }
        else {
            return (
                <Button
                    style={[styles.rounded, {backgroundColor: 'orange'}]}
                    onPress={() => this.props.pause()}
                >
                    <Icon
                        name="pause"
                        size={40}
                        color="#fff"
                    />
                </Button>
            )
        }
    }

    formatValue(time) {
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

    formatDistance(distance) {
        return distance.toFixed(2);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {this.formatValue(this.props.time)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                    Time
                    </H3>
                </View>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {this.formatDistance(this.props.distance)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                        Miles
                    </H3>
                </View>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {this.formatValue(this.props.pace)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                        Pace Per Mile
                    </H3>
                </View>
                <View style={[styles.row, styles.buttonContainer]}>
                    {this.renderButtons()}
                    <Button style={[styles.rounded, {backgroundColor: 'red'}]}>
                        <Icon
                            name="stop"
                            size={40}
                            color="#fff"
                        />
                    </Button>
                </View>
            </View>
        )
    }
}