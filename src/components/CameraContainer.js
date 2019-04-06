import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import navigationService from '../services/NavigationService';
import styles from '../styles/activityStyles';
import { H3 } from 'native-base';
import { View } from 'react-native';

export default class CameraContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.cameraContainer}>
                <H3>
                    Add Photo?
                </H3>
                <Icon
                    name="camera"
                    size={60}
                    color="#3BB9FF"
                    onPress={() => navigationService.navigate('CameraScreen')}
                />
            </View>
        )
    }
}