import React, { Component } from 'react';
import { Spinner } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from '../styles/mainStyles';
import { connect } from 'react-redux';

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.02305,
            longitudeDelta: 0.02085,
        }
    }

    componentDidMount() {
        this.setState({
            latitude: this.props.latitude,
            longitude: this.props.longitude
        })
    }

    onRegionChange(region) {
        this.setState({ 
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
         });
    }

    render() {
        if (this.state.latitude !== null) {
            return (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state}
                    onRegionChange={(region) => this.onRegionChange(region)}
                >
                    <Marker
                        coordinate={{
                            latitude: this.props.latitude,
                            longitude: this.props.longitude
                        }}
                        title={"Current Position"}
                    />
                </MapView>
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

export default connect(mapStateToProps)(Map);