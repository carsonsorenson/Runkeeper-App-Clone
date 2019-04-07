import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, Text, H2, Left, Right } from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/rewardsStyles';

class LevelAward extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: 0,
            level: 0,
            numNeeded: "0",
            nextLevel: "0"
        }
    }

    update() {
        let counter = 0;
        let level = 0
        for (let i in this.props.activites) {
            counter += 1
        }
        if (counter > 0) {
            level = Math.floor(counter / 5)
        }
        this.setState({
            size: counter.toString(),
            level: level.toString(),
            numNeeded: (5 - (counter % 5)).toString(),
            nextLevel: (level + 1).toString()
        });
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activites !== this.props.activites) {
            this.update();
        }
    }

    render() {
        return (
            <Card>
                <CardItem bordered>
                    <View style={styles.trophyContainer}>
                        <H2>
                            You have reached level {this.state.level}!
                        </H2>
                    </View>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Text>
                            Activities Completed
                        </Text>
                    </Left>
                    <Right>
                        <Text>
                            {this.state.size}
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
                            {this.state.numNeeded}
                        </Text>
                    </Right>
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

export default connect(mapStateToProps)(LevelAward)