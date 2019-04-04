import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { setFeeling } from '../redux/actions/currentActivityActions';

class Feeling extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>
                How do you feel?
            </Text>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetFeeling: (feeling) => dispatch(setFeeling(feeling)),
    }
}

export default connect(null, mapDispatchToProps)(Feeling);
