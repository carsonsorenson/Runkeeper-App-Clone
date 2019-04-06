import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class TestScreen extends Component {
    static navigationOptions = {
        title: 'Delete',
        headerLeft: null
    }

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        return (
            <Text>
                hi
            </Text>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        activites: state.activitesReducer,
    }
}

export default connect(mapStateToProps)(TestScreen);