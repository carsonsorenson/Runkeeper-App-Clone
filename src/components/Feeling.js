import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H3 } from 'native-base';
import { View } from 'react-native';
import { setFeeling } from '../redux/actions/currentActivityActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../styles/activityStyles';


class Feeling extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            pressed: null,
            primaryColor: '#3BB9FF',
            secondaryColor: 'lightblue',
            emojiSize: 65
        }
    }

    pressed(val) {
        this.setState({pressed: val});
        this.props.dispatchSetFeeling(val);
    }

    getIcon() {
        let list = [
            'emoticon-dead',
            'emoticon-sad',
            'emoticon-neutral',
            'emoticon-happy',
            'emoticon'
        ]
        return (
            <View style={styles.feelingContainer}>
                {list.map((name, index) =>
                    <Icon
                        name={name}
                        size={this.state.emojiSize}
                        color={this.state.pressed === index ? this.state.primaryColor : this.state.secondaryColor}
                        onPress={() => this.pressed(index)}
                        key={name}
                    />
                )}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.feelingPageContainer}>
                <H3 style={styles.feelingText}>
                    How do you feel?
                </H3>
                {this.getIcon()}
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetFeeling: (feeling) => dispatch(setFeeling(feeling)),
    }
}

export default connect(null, mapDispatchToProps)(Feeling);
