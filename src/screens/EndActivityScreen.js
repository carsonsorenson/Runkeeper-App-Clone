import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { finalPosition, finalWeather } from '../redux/actions/currentActivityActions';
import SummaryBar from '../components/SummaryBar';
import Feeling from '../components/Feeling';
import WeatherCompare from '../components/WeatherCompare';
import weatherService from '../services/weather.service';

class EndActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity Summary',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatchFinalPosition(
            this.props.latitude,
            this.props.longitude
        )
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
            <View>
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
            </View>
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
        dispatchFinalPosition: (lat, lon) => dispatch(finalPosition(lat, lon)),
        dispatchFinalWeather: (weather) => dispatch(finalWeather(weather))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EndActivityScreen);