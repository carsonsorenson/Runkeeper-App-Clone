import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';

class PersonalBests extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.bests);
        return (
            <Text>
                hi
            </Text>
        )
    }
}

function mapStateToProps(state) {
    return {
        bests: state.rewardsReducer
    }
}

export default connect(mapStateToProps)(PersonalBests);