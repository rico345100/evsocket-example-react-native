import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from 'App/components/Header';
import ChatList from 'App/components/ChatList';
import MessageForm from 'App/components/MessageForm';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#F5FCFF'
	}
});

class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Header />
				<ChatList />
				<MessageForm />
			</View>
		);
	}
}

export default App;