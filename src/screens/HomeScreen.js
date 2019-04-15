import React, { Component } from 'react';
import { Spinner, Container, Button, Text } from 'native-base';
import { View, PermissionsAndroid } from 'react-native';
import Map from '../components/Map';
import Weather from '../components/Weather';
import Activity from '../components/Activity';
import { connect } from 'react-redux';
import { setCoords } from '../redux/actions/locationActions';
import { updateBests } from '../redux/actions/rewardsActions';
import { setActivites } from '../redux/actions/activitiesActions';
import weatherService from '../services/weather.service';
import styles from '../styles/mainStyles';
import navigationService from '../services/NavigationService';
import dataController from '../services/DataController';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Home Screen'
    }

    constructor(props) {
        super(props)

        this.state = {
            weather: null,
            activity: 'Running',
            loading: true,
            loadingWeather: true,
            loadingGPS: true,
            loadingStorage: true
        }
    }

    requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Location Permission',
              'message': 'This app needs access to your location',
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.startGps();
          } else {
            console.log("Location permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
    }

    startGps() {
        this.gpsId = navigator.geolocation.watchPosition(
            (position) => {
                this.props.dispatchSetCoords(
                    position.coords.latitude,
                    position.coords.longitude,
                    position.coords.altitude
                );
            },
            (error) => console.log("error: ", error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 15
            }
        )
    }

    updateWeather() {
        weatherService.getWeather(this.props.latitude, this.props.longitude)
        .then(results => {
            this.setState({
                weather: results,
                loadingWeather: false
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    getActivities() {
        dataController.getAllActivities()
            .then(result => {
                this.setState({
                    loadingStorage: false
                })
                this.props.dispatchSetActivites(result);
            })
            .catch(error => {
                console.log('error', error)
                this.setState({loadingStorage: false});
            })
    }

    componentDidMount() {
        this.getActivities();
        if (this.props.latitude !== null && this.props.longitude !== null) {
            this.setState({loadingGPS: false});
            this.updateWeather();
        }
        this.requestLocationPermission();
    }


    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            this.setState({loadingGPS: false});
            this.updateWeather();
        }
        if (this.props.activities !== prevProps.activites) {
            this.props.dispatchUpdateBests(this.props.activites);
        }
        if (this.state.loadingGPS === false && this.state.loadingStorage === false && this.state.loadingWeather === false && this.state.loading === true) {
            this.setState({loading: false});
        }
    }

    setActivity(activity) {
        this.setState({activity})
    }

    componentWillUnmount() {
        console.log('here!!! in component will unmount');
        navigator.geolocation.clearWatch(this.gpsID);
    }

    startActivity() {
        navigationService.navigate('OngoingActivityScreen',
            {
                activity: this.state.activity,
                weather: this.state.weather
            });
    }

    render() {
        if (this.state.loading === false) {
            return (
                <Container style={styles.container}>
                    <Map />
                    <View style={{margin: 10}}>
                        <Activity set={(activity) => this.setActivity(activity)} />
                        <Weather weather={this.state.weather} />
                        <Button style={styles.button} onPress={() => this.startActivity()}>
                            <Text>
                                Start!
                            </Text>
                        </Button>
                    </View>
                </Container>
            )
        }
        else {
            return (
                <View>
                    <Text>
                        Finding Location...
                    </Text>
                    <Spinner />
                </View>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.latitude,
        longitude: state.locationReducer.longitude,
        activites: state.activitiesReducer.activites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateBests: (activities) => dispatch(updateBests(activities)),
        dispatchSetCoords: (lat, lon, elevation) => dispatch(setCoords(lat, lon, elevation)),
        dispatchSetActivites: (activites) => dispatch(setActivites(activites))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);