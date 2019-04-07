import React, { Component } from 'react';
import { Picker, Text, CardItem } from 'native-base';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import styles from '../styles/listStyles';


class ActivityHistoryList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "All",
            sorted: "Date",
            range: "All",
            data: []
        }
    }

    componentDidMount() {
        this.setState({data: this.props.activites});
    }

    componentDidUpdate(prevProps) {
        if (this.props.activites !== prevProps.activites) {
            this.setState({data: this.props.activites});
        }
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

    renderActivity = ({ item, index }) => {
        return (
            <CardItem>
                <Text>
                    {item.activity}
                </Text>
            </CardItem>
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
                        <Picker.Item label="Duration" value="Duration" />
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text>
                        Filter Date:
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