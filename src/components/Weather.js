import React, { Component } from 'react';
import { Card, CardItem, Spinner, Text, Left, Right, H2 } from 'native-base';
import { Image } from 'react-native'
import styles from '../styles/mainStyles';

export default class Weather extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        if (this.props.weather !== null) {
            return (
                <Card>
                    <CardItem style={styles.weather}>
                        <Left>
                            <Image style={{width:85, height:85}} source={{uri: this.props.weather.getIcon()}} />
                        </Left>
                        <Right>
                            <H2 style={styles.weatherText}> {this.props.weather.getCity()} </H2>
                        </Right>
                    </CardItem>
                    <CardItem style={styles.weather}>
                        <Left>
                            <Text style={styles.weatherText}>{this.props.weather.getDescription()}</Text>
                        </Left>
                        <Right>
                            <Text style={styles.weatherText}>{this.props.weather.getTemp()}°F</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        }
        else {
            return (
                <Spinner />
            )
        }
    }
}