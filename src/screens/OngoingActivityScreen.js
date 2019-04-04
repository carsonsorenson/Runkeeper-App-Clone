import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeActivity, updateDistance, updatePace, pause, updateTime } from '../redux/actions/currentActivityActions';
import CurrentActivityLayout from '../components/CurrentActivityLayout';
import navigationService from '../services/NavigationService';

class OngoingActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity',
        headerLeft: null
    }

    constructor(props) {
        super(props)
        this.state = {
            timer: null
        }
    }

    componentDidMount() {
        this.props.dispatchInitializeActivity(
            this.props.latitude,
            this.props.longitude,
            this.props.navigation.getParam("activity"),
            this.props.navigation.getParam("weather")
        )
        this.play();
    }

    pause() {
        clearInterval(this.state.timer);
        this.setState({timer:null});
        this.props.dispatchPause(false);
    }

    stop() {
        this.pause();
        navigationService.navigate('EndActivityScreen');
    }

    play() {
        let timer = setInterval(() => {
            this.props.dispatchUpdateTime(this.props.currentActivity.time + 1);
        }, 1000);
        this.setState({timer});
        this.props.dispatchPause(true);
    }

    calculateDistance(prevLatitude, prevLongitude) {
        if (this.props.currentActivity.paused === false) {
            var latitudeOne = this.toRadians(this.props.latitude);
            var latitudeTwo = this.toRadians(prevLatitude);
            var theta = this.toRadians(this.props.longitude - prevLongitude);
            var dist = Math.sin(latitudeOne) * Math.sin(latitudeTwo) + Math.cos(latitudeOne) * Math.cos(latitudeTwo) * Math.cos(theta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            this.props.dispatchUpdateDistance(this.props.currentActivity.distance + dist);
        }
    }

    calculatePace() {
        var pace = 0;
        if (this.props.currentActivity.distance > 0) {
            pace = this.props.currentActivity.time / this.props.currentActivity.distance;
        }
        if (pace != this.props.currentActivity.pace) {
            this.props.dispatchUpdatePace(pace);
        }
    }

    toRadians(v) {
        return v * Math.PI / 180;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            this.calculateDistance(prevProps.latitude, prevProps.longitude);
        }
        if (this.props.currentActivity.time !== prevProps.currentActivity.time) {
            this.calculatePace();
        }
    }

    render() {
        return (
            <CurrentActivityLayout
                time={this.props.currentActivity.time}
                distance={this.props.currentActivity.distance}
                pace={this.props.currentActivity.pace}
                paused={this.props.currentActivity.paused}
                play={() => this.play()}
                pause={() => this.pause()}
                stop={() => this.stop()}
            />
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
        dispatchInitializeActivity: (lat, lon, activity, weather) => dispatch(initializeActivity(lat, lon, activity, weather)),
        dispatchUpdateDistance: (dis) => dispatch(updateDistance(dis)),
        dispatchPause: (isPaused) => dispatch(pause(isPaused)),
        dispatchUpdatePace: (pace) => dispatch(updatePace(pace)),
        dispatchUpdateTime: (time) => dispatch(updateTime(time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingActivityScreen);