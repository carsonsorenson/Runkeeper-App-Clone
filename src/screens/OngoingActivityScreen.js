import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { initializeActivity, updateDistance } from '../redux/actions/currentActivityActions';
import Timer from '../components/Timer';
import Distance from '../components/Distance';
import Pace from '../components/Pace';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        let timer = setInterval(() => {
            this.setState((prevState) => {
                return {
                    time: prevState.time + 1
                }
            });
        }, 1000);
        this.setState({timer});
    }

    caluculateDistance(prevLatitude, prevLongitude) {
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

    toRadians(v) {
        return v * Math.PI / 180;
    }

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            console.log(this.props);
            this.caluculateDistance(prevProps.latitude, prevProps.longitude);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Timer time={this.state.time} />
                </View>
                <View style={styles.row}>
                    <Distance distance={this.props.currentActivity.distance} />
                </View>
                <View style={styles.row}>
                    <Pace pace={0} />
                </View>
                <View style={[styles.row, styles.buttonContainer]}>
                    <Button style={[styles.rounded, {backgroundColor: 'green'}]}>
                        <Icon
                            name="play"
                            size={40}
                            color="#fff"
                        />
                    </Button>
                    <Button style={[styles.rounded, {backgroundColor: 'orange'}]}>
                        <Icon
                            name="pause"
                            size={40}
                            color="#fff"
                        />
                    </Button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingActivityScreen);