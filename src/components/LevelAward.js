import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, Text, H2, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        let counter = this.props.activites.length;
        let level = 0
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
                    <Left>
                        <Icon
                            style={{paddingRight: 20}}
                            name="trophy"
                            size={40}
                            color="gold"
                        />
                        <H2>
                            You have reached level {this.state.level}!
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
        activites: state.activitiesReducer.activites
    }
}

export default connect(mapStateToProps)(LevelAward)