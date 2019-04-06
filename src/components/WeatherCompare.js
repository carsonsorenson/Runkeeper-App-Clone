import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, Spinner, H3 } from 'native-base';
import styles from '../styles/activityStyles';
import { connect } from 'react-redux';

class WeatherCompare extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.finalWeather !== null) {
            return (
                <View style={styles.weatherContainer}>
                    <View style={[styles.weatherBox, {borderRightWidth: 1, borderRightColor: 'white'}]}>
                        <H3 style={styles.weatherText}>
                            Initial Weather
                        </H3>
                        <Image style={{width:85, height:85}} source={{uri: this.props.initialWeather.icon}} />
                        <H3 style={styles.weatherText}>
                            {this.props.initialWeather.temp}°F
                        </H3>
                    </View>
                    <View style={styles.weatherBox}>
                        <H3 style={styles.weatherText}>
                            Final Weather
                        </H3>
                        <Image style={{width:85, height:85}} source={{uri: this.props.finalWeather.icon}} />
                        <H3 style={styles.weatherText}>
                            {this.props.finalWeather.temp}°F
                        </H3>
                    </View>
                </View>
            )
        }
        else {
            return (
                <Spinner />
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        initialWeather: state.currentActivityReducer.initialWeather,
        finalWeather: state.currentActivityReducer.finalWeather
    }
}

export default connect(mapStateToProps)(WeatherCompare);