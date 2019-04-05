import React, { Component } from 'react';
import { View, CameraRoll, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { H3, Spinner, Text } from 'native-base';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/activityStyles';

export default class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Camera',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (Platform.OS === 'Android') {
            requestCameraPermission();
        }
    }

    render() {
        return (
            <RNCamera
                ref={ref => {this.camera = ref;}}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
            >
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        )
    }

    takePicture = async function() {
        if (this.camera) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                console.log(data);
            } catch(error) {
                console.log(error);
            }
        }
    };
}

async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
}