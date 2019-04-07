import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, Text, H2, Left, Right, Body, Button } from 'native-base';
import { formatValue, formatDistance } from './Calculations';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/rewardsStyles';
import { View } from 'react-native';

class PersonalBests extends Component {
    constructor(props) {
        super(props)
    }

    renderTime() {
        console.log(this.props);
        const { bests } = this.props;
        if (bests.time.id === null) {
            return (
                <CardItem bordered>
                    <Left>
                        <Text>
                            No longest time found
                        </Text>
                    </Left>
                </CardItem>
            )
        }
        else {
            return (
                <View>
                    <CardItem bordered>
                        <Left>
                            <Text>
                                Longest time:
                            </Text>
                        </Left>
                        <Right>
                            <Text>
                                {formatValue(bests.time.best).toString()}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Button
                            style={styles.button}
                            onPress={() => console.log(bests.time.id)}
                        >
                            <Text>
                                View Your Longest Activity
                            </Text>
                        </Button>
                    </CardItem>
                </View>
            )
        }
    }

    renderDistance() {
        const { bests } = this.props;
        if (bests.distance.id === null) {
            return (
                <CardItem bordered>
                    <Left>
                        <Text>
                            No longest distance found
                        </Text>
                    </Left>
                </CardItem>
            )
        }
        else {
            return (
                <View>
                    <CardItem bordered>
                        <Left>
                            <Text>
                                Longest Distance (miles):
                            </Text>
                        </Left>
                        <Right>
                            <Text>
                                {formatDistance(bests.distance.best).toString()}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Button
                            style={styles.button}
                            onPress={() => console.log(bests.distance.id)}
                        >
                            <Text>
                                View Your Longest Distance Activity
                            </Text>
                        </Button>
                    </CardItem>
                </View>
            )
        }
    }

    renderPace() {
        const { bests } = this.props;
        if (bests.pace.id === null) {
            return (
                <CardItem bordered>
                    <Left>
                        <Text>
                            No best pace found
                        </Text>
                    </Left>
                </CardItem>
            )
        }
        else {
            return (
                <View>
                    <CardItem bordered>
                        <Left>
                            <Text>
                                Best pace: (miles/min)
                            </Text>
                        </Left>
                        <Right>
                            <Text>
                                {formatValue(bests.pace.best).toString()}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Button
                            style={styles.button}
                            onPress={() => console.log(bests.pace.id)}
                        >
                            <Text>
                                View Your Activity With the best pace
                            </Text>
                        </Button>
                    </CardItem>
                </View>
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
                            Personal Bests
                        </H2>
                    </Left>
                </CardItem>
                {this.renderTime()}
                {this.renderDistance()}
                {this.renderPace()}
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        bests: state.rewardsReducer
    }
}

export default connect(mapStateToProps)(PersonalBests);