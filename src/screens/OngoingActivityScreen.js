import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeActivity, updateDistance, updatePace, pause } from '../redux/actions/currentActivityActions';
import CurrentActivityLayout from '../components/CurrentActivityLayout';

class OngoingActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity',
        headerLeft: null
    }

    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            timer: null
        }
    }

    componentDidMount() {
        this.props.dispatchInitializeActivity(
            this.props.latitude,
            this.props.longitude,
            this.props.navigation.getParam("activity")
        )
        this.play();
    }

    pause() {
        clearInterval(this.state.timer);
        this.setState({timer:null});
        this.props.dispatchPause(false);
    }

    play() {
        let timer = setInterval(() => {
            this.setState((prevState) => {
                return {
                    time: prevState.time + 1
                }
            });
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
            pace = this.state.time / this.props.currentActivity.distance;
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
        if (this.state.time !== prevState.time) {
            this.calculatePace();
        }
    }

    render() {
        return (
            <CurrentActivityLayout
                time={this.state.time}
                distance={this.props.currentActivity.distance}
                pace={this.props.currentActivity.pace}
                paused={this.props.currentActivity.paused}
                play={() => this.play()}
                pause={() => this.pause()}
            />
        )
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        this.setState({timer:null});
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
        dispatchInitializeActivity: (lat, lon, activity) => dispatch(initializeActivity(lat, lon, activity)),
        dispatchUpdateDistance: (dis) => dispatch(updateDistance(dis)),
        dispatchPause: (isPaused) => dispatch(pause(isPaused)),
        dispatchUpdatePace: (pace) => dispatch(updatePace(pace))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingActivityScreen);