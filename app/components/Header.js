import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { send, close, join } from 'App/socket';
import prompt from 'react-native-prompt-android';
import CustomButton from 'App/components/CustomButton';
import { SET_CHANNEL, SET_USERNAME } from 'App/actions/User';
import store from 'App/store';

const styles = StyleSheet.create({
	container: {
		height: 90	,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#4f8fd0'
	},
	group: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		fontSize: 14
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10 
	}
});

class Header extends Component {
	changeChannel = () => {
		prompt('Enter channel name.', this.props.channel, [
			{
				text: 'Cancel',
				style: 'cancel'
			}, {
				text: 'OK',
				onPress: (value) => {
					if(value && value !== this.props.channel) {
						join(value);
						store.dispatch({
							type: SET_CHANNEL,
							data: value
						});
					}
				}
			}
		]);
	}
	changeName = (newName) => {
		prompt('Enter username name.', this.props.username, [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: (value) => {
					if(value && value !== this.props.username) {
						send('system', `${this.props.username} renamed to ${value}.`);

						store.dispatch({
							type: SET_USERNAME,
							data: value
						});
					}
				}
			}
		]);
	}
	disconnect = () => {
		close();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.group}>
					<Text style={styles.header}>Realtime Chat App in React Native with EvSocket</Text>
				</View>
				<View style={styles.buttonContainer}>
					<CustomButton text="Set Channel" onPress={this.changeChannel} />
					<CustomButton text="Set Name" onPress={this.changeName} />
					<CustomButton text="Disconnect" onPress={this.disconnect} />
				</View>
			</View>
		);
	}
}

export default connect(state => {
	return {
		username: state.UserReducer.username,
		channel: state.UserReducer.channel
	};
})(Header);