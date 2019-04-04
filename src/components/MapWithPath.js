import React, { Component } from 'react';
import { Spinner } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/activityStyles';

class MapWithPath extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    componentDidMount() {
        this.setState({
            latitude: this.props.position[0].latitude,
            longitude: this.props.position[0].longitude
        })
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        console.log(this.props);
        if (this.state.latitude !== null && this.state.longitude !== null) {
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={this.state}
                        onRegionChange={(region) => this.onRegionChange(region)}
                    >
                        {this.props.position.map((pos, index) =>
                            <Marker
                                coordinate={{
                                    latitude: pos.latitude,
                                    longitude: pos.longitude
                                }}
                                pinColor={"black"}
                                key={index}
                            />
                        )}
                    </MapView>
                </View>
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
        position: state.currentActivityReducer.position
    }
}


export default connect(mapStateToProps)(MapWithPath);