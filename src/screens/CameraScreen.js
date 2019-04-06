import React, { Component } from 'react';
import { View, CameraRoll, PermissionsAndroid, Platform, Image } from 'react-native';
import { saveImage } from '../redux/actions/currentActivityActions';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
import SaveIcon from 'react-native-vector-icons/AntDesign';
import navigationService from '../services/NavigationService';

class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Camera',
    }

    constructor(props) {
        super(props)
        this.state = {
            direction: RNCamera.Constants.Type.back,
            path: null
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

    saveImage() {
        this.props.dispatchSaveImage(this.state.path);
        navigationService.navigate('EndActivityScreen');
    }

    renderCamera() {
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


    renderImage() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 6}}>
                    <Image
                        source={{ uri: this.state.path }}
                        style={styles.preview}
                    />
                </View>
                <View style={styles.cameraBar}>
                    <CancelIcon
                        name="cancel"
                        size={60}
                        color="white"
                        onPress={() => this.setState({path: null})}
                    />
                    <SaveIcon
                        name="save"
                        size={60}
                        color="white"
                        onPress={() => this.saveImage()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        )
    }

    takePicture = async function() {
        if (this.camera) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                this.setState({ path: data.uri });
            } catch(error) {
                console.log(error);
            }
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSaveImage: (image) => dispatch(saveImage(image))
    }
}


export default connect(null, mapDispatchToProps)(CameraScreen);

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