import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from 'App/components/CustomButton';
import { send } from 'App/socket';

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderTopWidth: 1,
		borderStyle: 'solid',
		borderTopColor: '#4f8fd0'
	},
	formGroup: {
		flex: 1,
		flexDirection: 'row'
	},
	formLeft: {
		flex: 3,
		backgroundColor: 'white'
	},
	formRight: {
		flex: 1
	},
	input: {
		flex: 1,
		padding: 12
	}
});

class MessageForm extends Component {
	state = {
		text: ''
	}
	constructor(props) {
		super(props);
	}
	sendMessage = () => {
		if(!this.state.text) return;
		
		send(this.props.username, this.state.text);
		this.setState({ text: '' });
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.formGroup}>
					<View style={styles.formLeft}>
						<TextInput
							style={styles.input}
							placeholder="Message..."
							onChangeText={text => { this.setState({ text }) }}
							autoCorrect={false}
							underlineColorAndroid="white"
							value={this.state.text}
						/>
					</View>
					<View style={styles.formRight}>
						<CustomButton text="Send" onPress={this.sendMessage} style={{
							flex: 1
						}} />
					</View>
				</View>
			</View>
		);
	}
}

export default connect(state => {
	return {
		username: state.UserReducer.username
	};
})(MessageForm);