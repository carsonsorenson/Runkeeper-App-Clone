import React, { Component } from 'react';
import { View, ScrollView, BackHandler, Alert } from 'react-native';
import { Button, H3 } from 'native-base';
import { connect } from 'react-redux';
import { finalWeather } from '../redux/actions/currentActivityActions';
import { addActivity } from '../redux/actions/activitiesActions';
import weatherService from '../services/weather.service';
import styles from '../styles/activityStyles';
import navigationService from '../services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';

import SummaryBar from '../components/SummaryBar';
import Feeling from '../components/Feeling';
import MapWithPath from '../components/MapWithPath';
import WeatherCompare from '../components/WeatherCompare';
import CameraContainer from '../components/CameraContainer';
import { NavigationActions, StackActions } from 'react-navigation';

class EndActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity Summary',
        headerLeft: null,
        headerRight: (
            <Icon
                name="trash"
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
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
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
            return true;
        });
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
        this.props.navigation.replace('Home');
        //navigationService.navigate('Home');
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

    componentWillUnmount() {
        this.backHandler.remove();
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