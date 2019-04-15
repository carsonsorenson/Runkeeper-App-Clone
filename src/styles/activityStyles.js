import { StyleSheet } from 'react-native';

export default mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigText: {
        fontSize: 50,
        fontWeight: '100',
        alignSelf: 'center'
    },
    rounded: {
        borderWidth: 1,
        borderRadius: 90,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    summaryContainer: {
        height: 100,
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    summary: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 24,
        fontWeight: '100',
        alignSelf: 'center'
    },
    feelingPageContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    feelingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10
    },
    endSummary: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    feelingText: {
        alignSelf: 'center',
        padding: 15
    },
    weatherContainer: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: '#3BB9FF'
    },
    weatherBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    weatherText: {
        color: 'white'
    },
    cameraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
    },
    cameraBar: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f64c72',
        justifyContent: 'center',
    },
    mapContainer: {
        width: '100%',
        height: 400,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    preview: {
        height: '100%',
        width: '100%',
    },
    congratsView: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10
    }
});