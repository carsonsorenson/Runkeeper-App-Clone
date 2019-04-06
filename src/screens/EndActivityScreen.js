import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, H3 } from 'native-base';
import { connect } from 'react-redux';
import { finalWeather } from '../redux/actions/currentActivityActions';
import { addActivity } from '../redux/actions/activitiesActions';
import weatherService from '../services/weather.service';
import styles from '../styles/activityStyles';
import navigationService from '../services/NavigationService';

import SummaryBar from '../components/SummaryBar';
import Feeling from '../components/Feeling';
import MapWithPath from '../components/MapWithPath';
import WeatherCompare from '../components/WeatherCompare';
import CameraContainer from '../components/CameraContainer';

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

    saveActivity() {
        this.props.dispatchAddActivity(this.props.currentActivity);
        navigationService.navigate('TestScreen');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 10}}>
                    <ScrollView>
                        <SummaryBar />
                        <Feeling />
                        <WeatherCompare />
                        <CameraContainer />
                        <MapWithPath />
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        style={styles.button}
                        onPress={() => this.saveActivity()}
                    >
                        <H3 style={{color: 'white'}}>
                            Save Activity
                        </H3>
                    </Button>
                </View>
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
        dispatchFinalWeather: (weather) => dispatch(finalWeather(weather)),
        dispatchAddActivity: (activity) => dispatch(addActivity(activity))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EndActivityScreen);