import React, { Component } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { finalPosition } from '../redux/actions/currentActivityActions';
import SummaryBar from '../components/SummaryBar';

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
            <SummaryBar
                distance={this.props.currentActivity.distance}
                time={this.props.currentActivity.time}
                pace={this.props.currentActivity.pace}
            />
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