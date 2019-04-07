import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import LevelAward from '../components/LevelAward';
import PersonalBests from '../components/PersonalBests';
import SpeedAward from '../components/SpeedAward';
import { NavigationActions } from 'react-navigation';

class RewardsScreen extends Component {
    static navigationOptions = {
        title: 'Rewards',
    }

    constructor(props) {
        super(props)
    }

    send(id) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ActivityHistoryScreen',
            action: NavigationActions.navigate({ routeName: 'ActivityDetailScreen', params: {id}}),
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        if (this.props.activites.length !== 0) {
            return (
                <View>
                    <ScrollView>
                        <LevelAward />
                        <PersonalBests send={(id) => this.send(id)} />
                        <SpeedAward send={(id) => this.send(id)} />
                    </ScrollView>
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        You have not completed any activites yet!
                    </Text>
                </View>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer.activites,
    }
}

export default connect(mapStateToProps)(RewardsScreen)