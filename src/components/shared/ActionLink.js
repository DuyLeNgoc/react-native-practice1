/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
	TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Themes from 'theme';

export default class ActionLink extends Component {
  render() {
    return (
			<View style={styles.container}>
				<Text style={styles.questionText}>
				{this.props.questionText}
				</Text>
				<TouchableOpacity
					activeOpacity={.5}
					onPress={this.props.handleAction}>
					<Text style={styles.actionText}>
					{this.props.actionText}
					</Text>
				</TouchableOpacity>
			</View>
    );
  }
}

ActionLink.defaultProps = {
  questionText: '',
  actionText: ''
};

ActionLink.propTypes = {
	handleAction: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
	questionText: PropTypes.string
};

const styles = StyleSheet.create({
	container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionText: {
		fontSize: Themes.Fonts.size.medium,
    color: "white",
    marginLeft: 5,
    backgroundColor: Themes.Colors.transparent
  },
  actionText: {
		marginLeft: 5,
		fontSize: Themes.Fonts.size.regular,
    color: "#D8D8D8",
    backgroundColor: Themes.Colors.transparent
  }
});
