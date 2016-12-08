import React, { Component } from 'react';
import store from 'App/store';
import { Provider } from 'react-redux';
import ChatApp from 'App/components/ChatApp';
import { init } from 'App/socket';

class App extends Component {
	componentDidMount() {
		init();
	}
	render() {
		return (
			<Provider store={store}>
				<ChatApp />
			</Provider>
		);
	}
}

export default App;