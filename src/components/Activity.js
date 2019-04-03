import React, { Component } from 'react';
import {Form, Picker } from 'native-base';

export default class Activity extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            selected: "key0"
        };
    }

    onValueChange(value) {
        this.props.set(value);
        this.setState({
            selected: value
        })
    }

    render() {
        return (
            <Form style={{backgroundColor: 'white'}}>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label="Running" value="Running" />
                    <Picker.Item label="Biking" value="Biking" />
                    <Picker.Item label="Skiing" value="Skiing" />
                    <Picker.Item label="Walking" value="Walking" />
                    <Picker.Item label="Hiking" value="Hiking" />
                </Picker>
            </Form>
        )
    }
}