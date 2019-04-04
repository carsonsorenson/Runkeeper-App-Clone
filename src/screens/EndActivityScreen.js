import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, H3, Container } from 'native-base';
import { connect } from 'react-redux';
import { finalWeather } from '../redux/actions/currentActivityActions';
import SummaryBar from '../components/SummaryBar';
import Feeling from '../components/Feeling';
import MapWithPath from '../components/MapWithPath';
import WeatherCompare from '../components/WeatherCompare';
import weatherService from '../services/weather.service';
import styles from '../styles/activityStyles';

class EndActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity Summary',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        weatherService.getWeather(this.props.latitude, this.props.longitude)
        .then(results => {
            this.props.dispatchFinalWeather(results);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <ScrollView>
                <SummaryBar
                    distance={this.props.currentActivity.distance}
                    time={this.props.currentActivity.time}
                    pace={this.props.currentActivity.pace}
                />
                <Feeling />
                <WeatherCompare
                    initialWeather={this.props.currentActivity.initialWeather}
                    finalWeather={this.props.currentActivity.finalWeather}
                />
                <MapWithPath />
                <Button style={styles.button}>
                    <H3 style={{color: 'white'}}>
                        Save Activity
                    </H3>
                </Button>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.latitude,
        longitude: state.locationReducer.longitude,
        currentActivity: state.currentActivityReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFinalWeather: (weather) => dispatch(finalWeather(weather))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EndActivityScreen);