import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class TestScreen extends Component {
    static navigationOptions = {
        title: 'yo whaddup',
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
    return {
        activites: state.activitiesReducer.activites
    }
}

export default connect(mapStateToProps)(TestScreen);