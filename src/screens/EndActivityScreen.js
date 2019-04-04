import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { finalPosition } from '../redux/actions/currentActivityActions';
import SummaryBar from '../components/SummaryBar';
import Feeling from '../components/Feeling';

class EndActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity Summary',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatchFinalPosition(
            this.props.latitude,
            this.props.longitude
        )
    }

    render() {
        console.log(this.props);
        return (
            <View>
                <SummaryBar
                    distance={this.props.currentActivity.distance}
                    time={this.props.currentActivity.time}
                    pace={this.props.currentActivity.pace}
                />
                <Feeling />
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
        dispatchFinalPosition: (lat, lon) => dispatch(finalPosition(lat, lon)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EndActivityScreen);