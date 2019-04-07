import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class ActivityHistoryScreen extends Component {
    static navigationOptions = {
        title: 'Activity History',
    }

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.activites !== null) {
            for (let i in this.props.activites) {
                console.log(i);
            }
        }
        return (
            <Text>
                hi
            </Text>
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer
    }
}

export default connect(mapStateToProps)(ActivityHistoryScreen);