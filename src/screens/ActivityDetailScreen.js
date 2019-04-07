import React, { Component } from 'react';
import { Text, Spinner } from 'native-base';
import { connect } from 'react-redux';

class ActivityDetailScreen extends Component {
    static navigationOptions = {
        title: 'Activity Detail'
    }

    constructor(props) {
        super(props)

        this.state = {
            activity: {},
            loading: true
        }
    }

    componentDidMount() {
        for (let i = 0; i < this.props.activites.length; i++){
            if (this.props.activites[i].id === this.props.navigation.getParam("id")) {
                this.setState({ activity: this.props.activites[i]});
                break;
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activity !== this.state.activity && this.state.loading) {
            this.setState({loading: false});
        }
    }
    
    renderActivity() {
        return (
            <Text>
                hi
            </Text>
        )
    }

    render() {
        return (
            this.state.loading ? <Spinner /> : this.renderActivity()
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer.activites,
        rewards: state.rewardsReducer,
    }
}

export default connect(mapStateToProps)(ActivityDetailScreen);