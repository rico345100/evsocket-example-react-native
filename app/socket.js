import EvSocket from 'evsocket-client';
import store from 'App/store';
import { CHAT_RECV } from 'App/actions/Chat';
import { SET_USERNAME } from 'App/actions/User';

var socket = null;

export function init() {
	socket = new EvSocket("ws://YOUR_DOMAIN");
	let state = store.getState();
	let { ChatReducer, UserReducer } = state;
	let chatId = 0;

	socket.on('open', () => {
		store.dispatch({
			type: SET_USERNAME,
			data: socket.id
		});

		socket.join(UserReducer.channel);
	});
	socket.on('chat', (data) => {
		store.dispatch({
			type: CHAT_RECV,
			data: {
				who: data.who,
				message: data.message,
				id: chatId++
			}
		});
	});

	socket.on('channeljoin', (channelName) => {
		socket.broadcast('chat', {
			who: 'system',
			message: `${socket.id} joined to channel ${channelName} from React-Native.`
		});
	});
}

export function send(who, message) {
	socket.broadcast('chat', { who, message });
}

export function close() {
	socket && socket.close();
}

export function join(channelName) {
	socket.join(channelName);
}