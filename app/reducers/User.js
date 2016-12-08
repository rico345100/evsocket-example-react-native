import { SET_USERNAME, SET_CHANNEL } from 'App/actions/User';

const defaultState = {
	username: '',
	channel: 'default'
};

export default function(state = defaultState, action = {}) {
	switch(action.type) {
		case SET_USERNAME:
			return Object.assign({}, {
				username: action.data
			});
		case SET_CHANNEL:
			return Object.assign({}, {
				channel: action.data
			});
		default:
			return state;
	}
}