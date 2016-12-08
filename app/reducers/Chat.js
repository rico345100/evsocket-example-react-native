import { CHAT_INIT, CHAT_RECV } from 'App/actions/Chat';

const defaultState = {
	chatList: []
};

export default function(state = defaultState, action = {}) {
	switch(action.type) {
		case CHAT_INIT:
			return Object.assign({}, {
				chatList: []
			});
		case CHAT_RECV:
			let chatList = [...state.chatList, action.data];
			return Object.assign({}, {
				chatList
			});
		default:
			return state;
	}
}