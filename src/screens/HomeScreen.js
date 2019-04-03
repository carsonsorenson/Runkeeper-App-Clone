import React, { Component } from 'react';
import { Spinner, Container, Button, Text } from 'native-base';
import { View, PermissionsAndroid } from 'react-native';
import Map from '../components/Map';
import Weather from '../components/Weather';
import Activity from '../components/Activity';
import { connect } from 'react-redux';
import { setCoords } from '../redux/actions/locationActions';
import weatherService from '../services/weather.service';
import styles from '../styles/mainStyles';
import navigationService from '../services/NavigationService';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home Screen'
    }

    constructor(props) {
        super(props)

        this.state = {
            weather: null,
            activity: 'Running'
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
                console.log(position);
                this.props.dispatchSetCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => console.log("error: ", error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 5
            }
        )
    }

    componentDidMount() {
        this.requestLocationPermission();
    }


    componentDidUpdate() {
        if (this.props.latitude !== null && this.props.longitude !== null && this.state.weather === null) {
            weatherService.getWeather(this.props.latitude, this.props.longitude)
            .then(results => {
                this.setState({weather: results});
            })
            .catch(error => {
                console.log(error);
            })
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
        navigationService.navigate('OngoingActivityScreen', {activity: this.state.activity});
    }

    render() {
        if (this.props.latitude !== null && this.props.longitude !== null) {
            return (
                <Container style={styles.container}>
                    <Map/>
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
                <Spinner />
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.latitude,
        longitude: state.locationReducer.longitude
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetCoords: (lat, lon) => dispatch(setCoords(lat, lon)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);