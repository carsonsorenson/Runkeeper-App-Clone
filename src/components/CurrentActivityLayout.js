import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H3, Button } from 'native-base';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatValue, formatDistance} from './Calculations';

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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {formatDistance(this.props.distance)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                        Miles
                    </H3>
                </View>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {formatValue(this.props.time)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                    Time
                    </H3>
                </View>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {this.props.elevation.toFixed(2)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                        Elevation Tracker (feet)
                    </H3>
                </View>
                <View style={styles.row}>
                    <Text style={styles.bigText}>
                        {formatValue(this.props.pace)}
                    </Text>
                    <H3 style={{alignSelf: 'center'}}>
                        Pace Per Mile
                    </H3>
                </View>
                <View style={[styles.row, styles.buttonContainer]}>
                    {this.renderButtons()}
                    <Button
                        style={[styles.rounded, {backgroundColor: 'red'}]}
                        onPress={() => this.props.stop()}
                    >
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