import { StyleSheet } from 'react-native';

export default mainStyles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    weather: {
        backgroundColor:'rgba(56, 172, 236, 1)',
    },
    weatherText: {
        color: 'white'
    },
    button: {
        width: '100%',
        backgroundColor: 'orange',
        justifyContent: 'center'
    }
});