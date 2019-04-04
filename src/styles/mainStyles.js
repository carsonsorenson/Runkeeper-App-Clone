import { StyleSheet } from 'react-native';

export default mainStyles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    weather: {
        backgroundColor:'#3BB9FF',
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