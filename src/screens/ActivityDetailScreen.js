import React, { Component } from 'react';
import { Text, Spinner, H2 } from 'native-base';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import SummaryBar from '../components/SummaryBar';
import styles from '../styles/activityStyles';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import navigationService from '../services/NavigationService';
import { deleteActivity } from '../redux/actions/activitiesActions';

class ActivityDetailScreen extends Component {
    static navigationOptions = {
        title: 'Activity Detail',
        headerRight: (
            <Icon2
                name="trash"
                style={{margin:30}}
                size={30}
                color="black"
                onPress={() =>
                    Alert.alert(
                        "Delete Activity",
                        "Are you sure you want to delete this activity?",
                        [
                            {
                                text: "Cancel"
                            },
                            {
                                text: "Delete",
                                onPress: deleteIt
                            }
                        ],
                        { cancelable: false }
                    )
                }
            />
          ),
    }

    constructor(props) {
        super(props)

        this.state = {
            activity: {},
            loading: true,
            delete: false
        }
    }

    delete() {
        this.setState({
            loading: true,
            delete: true
        });
        this.props.dispatchDeleteActivity(this.state.activity.id);
    }

    componentWillMount() {
        deleteIt = () => this.delete();
    }

    componentDidMount() {
        for (let i = 0; i < this.props.activites.length; i++){
            if (this.props.activites[i].id === this.props.navigation.getParam("id")) {
                this.setState({ activity: this.props.activites[i]});
                break;
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activity !== this.state.activity && this.state.loading && !this.state.delete) {
            this.setState({loading: false});
        }
        if (this.props.activites !== prevProps.activites) {
            navigationService.navigate("ActivityHistoryScreen");
        }
    }

    renderIcon() {
        let list = [
            'emoji-sad',
            'emoji-neutral',
            'emoji-happy',
        ]
        return (
            <Icon
                name={list[this.state.activity.feeling]}
                size={40}
                color={"#3BB9FF"}
            />
        )
    }

    getAwardCard(k, t) {
        return (
            <View key={k} style={styles.congratsView}>
                <View style={{flex: 1}}>
                    <Icon
                        name="trophy"
                        size={40}
                        color="gold"
                    />
                </View>
                <View style={{flex: 4}}>
                    <Text>
                        {t}
                    </Text>
                </View>
            </View>
        )
    }

    renderAwards() {
        let data = []
        const { rewards } = this.props;
        if (this.state.activity.id === rewards.time.id) {
            data.push(this.getAwardCard("0", "Congratulations this activity won the award for longest duration!"));
        }
        if (this.state.activity.id === rewards.distance.id) {
            data.push(this.getAwardCard("1", "Congratulations this activity won the award for longest distance travelled!"));
        }
        if (this.state.activity.id === rewards.pace.id) {
            data.push(this.getAwardCard("2", "Congratulations this activity won the award for the best pace!"));
        }
        if (this.state.activity.id === rewards.speedId) {
            data.push(this.getAwardCard("3", "Congratulations this activity won the Speed Award!"));
        }
        if (data.length === 0) {
            data.push(
                <View key="0" style={[styles.congratsView, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text>
                        This activity didn't earn any awards :(
                    </Text>
                </View>
            )
        }
        return data;
    }
    
    renderActivity() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.feelingPageContainer}>
                    <View style={styles.endSummary}>
                        <H2>
                            Your Activity:
                        </H2>
                        <H2>
                            {this.state.activity.activity}
                        </H2>
                    </View>
                </View>
                <View style={styles.feelingPageContainer}>
                    <View style={styles.endSummary}>
                        <H2>
                            How You Felt:
                        </H2>
                        {this.renderIcon()}
                    </View>
                </View>
                <SummaryBar
                    distance={this.state.activity.distance}
                    time={this.state.activity.time}
                    pace={this.state.activity.pace}
                />
                <View style={styles.feelingPageContainer}>
                    <View style={styles.endSummary}>
                        <H2>
                            Put image here
                        </H2>
                    </View>
                </View>
                {this.renderAwards()}
            </View>
        )
    }

    renderSpinner() {
        return (
            <Spinner />
        )
    }

    render() {
        console.log(this.state.loading);
        return (
            this.state.loading ? this.renderSpinner() : this.renderActivity()
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer.activites,
        rewards: state.rewardsReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDeleteActivity: (id) => dispatch(deleteActivity(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailScreen);