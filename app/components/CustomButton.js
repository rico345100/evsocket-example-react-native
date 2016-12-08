import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#4f8fd0',
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8
	},
	buttonText: {
		color: 'white',
		textAlign: 'center'
	}
});

class CustomButton extends Component {
	static PropTypes = {
		text: React.PropTypes.string.isRequired,
		onPress: React.PropTypes.func,
		style: React.PropTypes.object
	}
	render() {
		const { onPress, text, style } = this.props;
		const flStyle = StyleSheet.flatten([styles.button, style]);
		
		return (
			<TouchableHighlight style={flStyle} onPress={onPress}>
				<Text style={styles.buttonText}>{text}</Text>
			</TouchableHighlight>
		);
	}
}

export default CustomButton;