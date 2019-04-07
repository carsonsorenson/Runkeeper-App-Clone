import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import LevelAward from '../components/LevelAward';
import PersonalBests from '../components/PersonalBests';
import SpeedAward from '../components/SpeedAward';
import { updateBests } from '../redux/actions/rewardsActions';

class RewardsScreen extends Component {
    static navigationOptions = {
        title: 'Rewards',
    }

    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    update() {
        this.setState({ loading: true });
        this.props.dispatchUpdateBests(this.props.activites);
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (this.props.bests !== prevProps.bests) {
            this.setState({
                loading: false
            })
        }
        if (this.props.activites !== prevProps.activites) {
            this.update();
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <View>
                    <ScrollView>
                        <LevelAward />
                        <PersonalBests />
                        <SpeedAward />
                    </ScrollView>
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
        activites: state.activitiesReducer.activites,
        bests: state.rewardsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateBests: (activities) => dispatch(updateBests(activities))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsScreen)