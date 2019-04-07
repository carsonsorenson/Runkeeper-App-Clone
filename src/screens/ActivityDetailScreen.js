import React, { Component } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';

class ActivityDetailScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>
                hi
            </Text>
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitesReducer,
        rewards: state.rewardsReducer,
    }
}

export default connect(mapStateToProps)(ActivityDetailScreen);