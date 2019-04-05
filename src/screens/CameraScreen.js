import React, { Component } from 'react';
import { View, CameraRoll, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { H3, Spinner, Text } from 'native-base';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Camera',
    }

    constructor(props) {
        super(props)
        this.state = {
            direction: RNCamera.Constants.Type.back
        }
    }

    componentDidMount() {
        if (Platform.OS === 'Android') {
            requestCameraPermission();
        }
    }

    switchDirections() {
        if (this.state.direction === RNCamera.Constants.Type.back) {
            this.setState({direction: RNCamera.Constants.Type.front});
        }
        else {
            this.setState({direction: RNCamera.Constants.Type.back});
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <RNCamera
                    ref={ref => {this.camera = ref;}}
                    style={{flex: 5}}
                    type={this.state.direction}
                >
                </RNCamera>
                <View style={styles.cameraBar}>
                    <Icon
                        name="circle"
                        color="white"
                        size={60}
                        onPress={this.takePicture.bind(this)}
                    />
                    <Icon2
                        name="md-reverse-camera"
                        color="white"
                        size={60}
                        onPress={() => this.switchDirections()}
                    />
                </View>
            </View>
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