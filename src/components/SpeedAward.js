import React, { Component } from 'react';
import { Text, Card, CardItem, Left, Body, H2 } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatValue } from './Calculations';
import styles from '../styles/rewardsStyles';

class SpeedAward extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: "0",
            pace: 0,
        }
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activites !== this.props.activites) {
            this.update();
        }
    }

    update() {
        bestPace = Infinity;
        level = 0;
        for (let activity in this.props.activites) {
            let a = this.props.activites[activity]
            if (a.distance >= 1 && a.activity === 'Running' && a.pace <= 600) {
                level = Math.floor((600 - a.pace) / 30) + 1;
                bestPace = a.pace
            }
        }
        if (level !== 0) {
            this.setState({
                level: level.toString(),
                pace: bestPace
            })
        }
    }

    renderLevel() {
        if (this.state.level !== "0") {
            return (
                <View>
                    <CardItem bordered>
                        <H2>
                            Your Level: {this.state.level}
                        </H2>
                    </CardItem>
                    <CardItem bordered>
                        <H2>
                            Your Best Pace: {formatValue(this.state.pace).toString()}
                        </H2>
                    </CardItem>
                </View>
            )
        }
        else {
            return (
                <CardItem bordered>
                    <Body>
                        <Text>
                            You have not accomplished this yet
                        </Text>
                    </Body>
                </CardItem>
            )
        }
    }

    render() {
        return (
            <Card>
                <CardItem bordered>
                    <Left>
                        <Icon
                            style={{paddingRight: 20}}
                            name="trophy"
                            size={40}
                            color="gold"
                        />
                        <H2>
                            Speed Award
                        </H2>
                    </Left>
                </CardItem>
                {this.renderLevel()}
                <CardItem bordered>
                    <Body>
                        <Text>
                            Details: In order to gain progress on the speed award you must choose the running activity and run for at least 1 mile, you are awarded level 1 for a pace of 10:00, level 2 for a pace of 9:30, level 3 for a pace of 9:00, and so on..
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer
    }
}

export default connect(mapStateToProps)(SpeedAward)