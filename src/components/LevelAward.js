import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, Text, H2, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class LevelAward extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { bests } = this.props;
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
                            You have reached level {bests.level}!
                        </H2>
                    </Left>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Text>
                            Activities Completed
                        </Text>
                    </Left>
                    <Right>
                        <Text>
                            {bests.size}
                        </Text>
                    </Right>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Text>
                            Workouts Until Next Level
                        </Text>
                    </Left>
                    <Right>
                        <Text>
                            {bests.numNeeded}
                        </Text>
                    </Right>
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

export default connect(mapStateToProps)(LevelAward)