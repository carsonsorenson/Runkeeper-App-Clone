import React, { Component } from 'react';
import { Text, Card, CardItem, Left, Body, H2, Button } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatValue } from './Calculations';
import styles from '../styles/rewardsStyles';

class SpeedAward extends Component {
    constructor(props) {
        super(props)
    }


    renderLevel() {
        const { bests } = this.props;
        if (bests.speedLevel !== 0) {
            return (
                <View>
                    <CardItem bordered>
                        <H2>
                            Your Level: {bests.speedLevel.toString()}
                        </H2>
                    </CardItem>
                    <CardItem bordered>
                        <H2>
                            Your Best Pace: {formatValue(bests.speedPace).toString()}
                        </H2>
                    </CardItem>
                    <CardItem bordered>
                        <Button
                            style={styles.button}
                            onPress={() => this.props.send(this.props.bests.speedId)}
                        >
                            <Text>
                                View Your Speed Award Activity
                            </Text>
                        </Button>
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
        bests: state.rewardsReducer
    }
}

export default connect(mapStateToProps)(SpeedAward)