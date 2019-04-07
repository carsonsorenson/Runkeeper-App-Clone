import React, { Component } from 'react';
import { Picker, Text, CardItem, Card } from 'native-base';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import styles from '../styles/listStyles';
import { formatValue, formatDistance } from './Calculations';

class ActivityHistoryList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "All",
            sorted: "Date",
            range: "All",
            data: [],
        }
    }

    sortByDuration(a, b) {
        if (a.time > b.time)
            return -1;
        if (a.time < b.time)
            return 1;
        return 0
    }
    
    sortByDistance(a, b) {
        if (a.distance > b.distance)
            return -1;
        if (a.distance < b.distance)
            return 1;
        return 0
    }

    sortByPace(a, b) {
        if (a.pace < b.pace)
            return -1;
        if (a.pace > b.pace)
            return 1;
        return 0
    }

    sortByDate(a, b) {
        if (a.date < b.date) {
            return - 1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }


    componentDidMount() {
        this.setState({data: this.props.activites});
        this.filterData(this.state.view);
        this.sortData(this.state.sorted);
    }

    componentDidUpdate(prevProps) {
        if (this.props.activites !== prevProps.activites) {
            this.setState({data: this.props.activites});
            this.filterData(this.state.view);
            this.sortData(this.state.sorted);
        }
    }

    filterData(value) {
        const newData = this.props.activites.filter(item => {
            if (value === 'All' || item.activity === value) {
                return item;
            }
        })
        this.setState({ data: newData });
    }

    sortData(value) {
        if (value === 'Duration') {
            const newData = this.state.data.sort(this.sortByDuration);
            this.setState({ data: newData });
        }
        else if (value === 'Distance') {
            const newData = this.state.data.sort(this.sortByDistance);
            console.log(newData);
            this.setState({ data: newData });
        }
        else if (value === 'Pace') {
            const newData = this.state.data.sort(this.sortByPace);
            this.setState({ data: newData });
        }
        else if (value === 'Date') {
            const newData = this.state.data.sort(this.sortByDate);
            this.setState({ data: newData });
        }
    }

    viewChange(value) {
        this.setState({ view: value });
        this.filterData(value);
    }

    sortedChange(value) {
        this.setState({ sorted: value });
        this.sortData(value);
    }

    rangeChange(value) {
        this.setState({ range: value });
    }

    renderActivity = ({ item, index }) => {
        return (
            <Card>
                <CardItem>
                    <Text>
                        {item.activity}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Distance: {formatDistance(item.distance).toString()}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Pace: {formatValue(item.pace).toString()}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Time: {formatValue(item.time).toString()}
                    </Text>
                </CardItem>
            </Card>
        )
    }

    renderEmptyList = () => {
        return (
            <Text>
                No Activities Found
            </Text>
        )
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