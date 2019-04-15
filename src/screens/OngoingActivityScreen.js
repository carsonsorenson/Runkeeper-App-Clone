import React, { Component } from 'react';
import { BackHandler, Alert, Button } from 'react-native';
import { connect } from 'react-redux';
import { initializeActivity, updateDistance, updatePace, pause, updateTime, updatePosition, updateElevation } from '../redux/actions/currentActivityActions';
import CurrentActivityLayout from '../components/CurrentActivityLayout';
import Icon from 'react-native-vector-icons/FontAwesome'
import navigationService from '../services/NavigationService';

class OngoingActivityScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Activity',
        tabBarVisible: false,
        headerRight: (
            <Icon
                name="trash"
                style={{margin:30}}
                size={30}
                color="black"
                onPress={() =>
                    Alert.alert(
                        "Exit Activity",
                        "Are you sure you want to quit your activity? It will not be saved",
                        [
                            {
                                text: "cancel"
                            },
                            {
                                text: "Quit",
                                onPress: () => { navigationService.navigate('Home') }
                            }
                        ],
                        { cancelable: false }
                    )
                }
            />
          ),
        headerLeft: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            timer: null
        }
    }

    deleteAlert() {
        Alert.alert(
            "Exit Activity",
            "Are you sure you want to quit your activity? It will not be saved",
            [
                {
                    text: "cancel"
                },
                {
                    text: "Quit",
                    onPress: () => { navigationService.navigate('Home'); }
                }
            ],
            { cancelable: false }
        );
    }


    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            this.deleteAlert();
            return true;
        });
        this.props.dispatchInitializeActivity(
            this.props.latitude,
            this.props.longitude,
            this.props.navigation.getParam("activity"),
            this.props.navigation.getParam("weather"),
            this.props.elevation
        )
        this.play();
    }

    pause() {
        clearInterval(this.state.timer);
        this.setState({timer:null});
        this.props.dispatchPause(false);
    }

    stop() {
        this.props.navigation.replace('EndActivityScreen');
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

    calculateElevation() {
        var elevationInFeet = (this.props.elevation - this.props.currentActivity.elevation) * 3.28084;
        this.props.dispatchUpdateElevation(elevationInFeet);
    }

    toRadians(v) {
        return v * Math.PI / 180;
    }

    componentDidUpdate(prevProps) {
        if (!this.props.currentActivity.paused) {
            if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
                this.props.dispatchUpdatePosition(this.props.latitude, this.props.longitude);
                this.calculateDistance(prevProps.latitude, prevProps.longitude);
            }
            if (this.props.currentActivity.time !== prevProps.currentActivity.time) {
                this.calculatePace();
            }
            if (this.props.elevation !== prevProps.elevation) {
                this.calculateElevation();
            }
        }
    }

    render() {
        return (
            <CurrentActivityLayout
                time={this.props.currentActivity.time}
                distance={this.props.currentActivity.distance}
                pace={this.props.currentActivity.pace}
                paused={this.props.currentActivity.paused}
                elevation={this.props.currentActivity.differenceElevation}
                play={() => this.play()}
                pause={() => this.pause()}
                stop={() => this.stop()}
            />
        )
    }

    componentWillUnmount() {
        this.backHandler.remove();
        clearInterval(this.state.timer);
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.latitude,
        longitude: state.locationReducer.longitude,
        elevation: state.locationReducer.elevation,
        currentActivity: state.currentActivityReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchInitializeActivity: (lat, lon, activity, weather, elevation) => dispatch(initializeActivity(lat, lon, activity, weather, elevation)),
        dispatchUpdateDistance: (dis) => dispatch(updateDistance(dis)),
        dispatchPause: (isPaused) => dispatch(pause(isPaused)),
        dispatchUpdatePace: (pace) => dispatch(updatePace(pace)),
        dispatchUpdateTime: (time) => dispatch(updateTime(time)),
        dispatchUpdatePosition: (lat, lon) => dispatch(updatePosition(lat, lon)),
        dispatchUpdateElevation: (elevation) => dispatch(updateElevation(elevation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingActivityScreen);