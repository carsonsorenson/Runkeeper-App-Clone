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
        fontSize: 60,
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
        fontSize: 35,
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
    button: {
        width: '100%',
        backgroundColor: '#f64c72',
        justifyContent: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 0
    }
});