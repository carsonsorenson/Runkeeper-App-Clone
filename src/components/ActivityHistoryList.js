import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker, Text, CardItem, Card, Left, H2, Right, H3, Button } from 'native-base';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import styles from '../styles/listStyles';
import { formatValue, formatDistance } from './Calculations';
import Icon from 'react-native-vector-icons/FontAwesome5';
import navigationService from '../services/NavigationService';


class ActivityHistoryList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "All",
            sorted: "Date",
            range: "All",
            data: [],
            icon: "arrow-down",
            sortVal: -1
        }
    }

    sortByDuration = num => (a, b) => {
        if (a.time < b.time)
            return num;
        if (a.time > b.time)
            return num * -1;
        return 0
    }
    
    sortByDistance = num => (a, b) => {
        if (a.distance < b.distance)
            return num;
        if (a.distance > b.distance)
            return num * -1;
        return 0
    }

    sortByPace = (num) => (a, b) => {
        if (a.pace < b.pace)
            return num;
        if (a.pace > b.pace)
            return num * -1;
        return 0
    }

    sortByDate = (num) => (a, b) => {
        a_date = new Date(a.date);
        b_date = new Date(b.date);
        if (a_date < b_date) {
            return num;
        }
        if (a_date > b_date) {
            return  num * -1;
        }
        return 0;
    }


    componentDidMount() {
        this.setState({data: this.props.activites});
        this.arrange()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activites !== this.props.activites) {
            this.arrange();
        }
        else if (this.state.view !== prevState.view || this.state.sorted !== prevState.sorted || this.state.range !== prevState.range) {
            this.arrange();
        }
        else if (this.state.sortVal !== prevState.sortVal) {
            this.arrange();
        }
    }

    arrange() {
        let newData = []
        newData = this.sortData(newData, this.state.sorted);
        console.log(newData)
        newData = this.filterData(newData, this.state.view);
        console.log(newData)
        newData = this.filterDate(newData, this.state.range);
        console.log(newData)
        console.log('done sorting');
        this.setState({data: newData});
    }

    filterData(newData, value) {
        const d = newData.filter(item => {
            if (value === 'All' || item.activity === value) {
                return item;
            }
        });
        return d;
    }

    filterDate(newData, value) {
        const rightNow = new Date();
        const utc1 = Date.UTC(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate());
        if (value === 'Week') {
            const d = newData.filter(item => {
                let date = new Date(item.date);
                let utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
                let diffDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
                if (diffDays <= 7) {
                    return true;
                }
            });
            return d;
        }
        else if (value === 'Month') {
            const d = newData.filter(item => {
                let date = new Date(item.date);
                if (rightNow.getUTCMonth() === date.getUTCMonth() && rightNow.getUTCFullYear() === date.getUTCFullYear()) {
                    return true;
                }
            });
            return d;
        }
        else if (value === 'Year') {
            const d = newData.filter(item => {
                let date = new Date(item.date);
                if (rightNow.getUTCFullYear() === date.getUTCFullYear()) {
                    return true;
                }
            });
            return d;
        }
        else {
            return newData;
        }
    }

    sortData(newData, value) {
        if (this.props.activites.length > 1) {
            if (value === 'Duration') {
                newData = this.props.activites.sort(this.sortByDuration(this.state.sortVal));
            }
            else if (value === 'Distance') {
                newData = this.props.activites.sort(this.sortByDistance(this.state.sortVal));
            }
            else if (value === 'Pace') {
                newData = this.props.activites.sort(this.sortByPace(this.state.sortVal));
            }
            else if (value === 'Date') {
                newData = this.props.activites.sort(this.sortByDate(this.state.sortVal));
            }
            else {
                newData = this.props.activites;
            }
        }
        else {
            newData = this.props.activites;
        }
        return newData
    }

    viewChange(value) {
        this.setState({ view: value });
    }

    sortedChange(value) {
        this.setState({ sorted: value });
    }

    rangeChange(value) {
        this.setState({ range: value });
    }

    renderIcon(activity) {
        let iconName = activity.toLowerCase();
        if (iconName === 'biking')
            iconName = 'bicycle';
        else if (iconName === "skiing") {
            iconName = "snowflake"
        }
        return (
            <Icon
                name={iconName}
                size={40}
                color="#3BB9FF"
                style={{paddingRight: 20}}
            />
        )
    }

    renderActivity = ({ item, index }) => {
        let date = new Date(item.date);
        const d = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return (
            <TouchableOpacity onPress={() => navigationService.navigate('ActivityDetailScreen', {id: item.id})}>
                <Card>
                    <CardItem>
                        <Left>
                            {this.renderIcon(item.activity)}
                            <H2>
                                {item.activity}
                            </H2>
                        </Left>
                        <Right>
                            <H2>
                                {d.toString()}
                            </H2>
                        </Right>
                    </CardItem>
                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <H3>
                                Distance
                            </H3>
                            <Text>
                                {formatDistance(item.distance).toString()}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <H3>
                                Pace
                            </H3>
                            <Text>
                                {formatValue(item.pace).toString()}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <H3>
                                Time
                            </H3>
                            <Text>
                                {formatValue(item.time).toString()}
                            </Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    renderEmptyList = () => {
        return (
            <Text>
                No Activities Found
            </Text>
        )
    }

    orderSwitched() {
        if (this.state.icon === "arrow-up") {
            this.setState({
                icon: "arrow-down",
                sortVal: -1
            })
        }
        else {
            this.setState({
                icon: "arrow-up",
                sortVal: 1
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>
                        View By:
                    </Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.view}
                        onValueChange={this.viewChange.bind(this)}
                    >
                        <Picker.Item label="All" value="All" />
                        <Picker.Item label="Running" value="Running" />
                        <Picker.Item label="Biking" value="Biking" />
                        <Picker.Item label="Skiing" value="Skiing" />
                        <Picker.Item label="Walking" value="Walking" />
                        <Picker.Item label="Hiking" value="Hiking" />
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text>
                        Sort By:
                    </Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.sorted}
                        onValueChange={this.sortedChange.bind(this)}
                    >
                        <Picker.Item label="Date" value="Date" />
                        <Picker.Item label="Pace" value="Pace" />
                        <Picker.Item label="Distance" value="Distance" />
                        <Picker.Item label="Duration" value="Duration" />
                    </Picker>
                    <Button style={{backgroundColor: 'white'}} onPress={() => this.orderSwitched()}>
                        <Icon
                            name={this.state.icon}
                            color="black"
                            size={20}
                        />
                    </Button>
                </View>
                <View style={styles.row}>
                    <Text>
                        Filter:
                    </Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.range}
                        onValueChange={this.rangeChange.bind(this)}
                    >
                        <Picker.Item label="Week" value="Week" />
                        <Picker.Item label="Month" value="Month" />
                        <Picker.Item label="Year" value="Year" />
                        <Picker.Item label="All" value="All" />
                    </Picker>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderActivity}
                    ListEmptyComponent={this.renderEmptyList}
                    extraData={this.state}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        activites: state.activitiesReducer.activites
    }
}

export default connect(mapStateToProps)(ActivityHistoryList);