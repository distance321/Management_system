import { routerRedux } from 'dva/router';
export default {
	namespace: 'tabs',
	state: {
		tabs: [],
		active_stack: []
	},
	reducers: {
		add(state, payload) {
			const tab = payload.payload;
			if (!state.active_stack.includes(tab.url)) {
				state.tabs.push(tab);
				state.active_stack.push(tab.url);
			}
		},
		remove(state, payload) {
			const targetKey = payload.payload;
			let { tabs = [], active_stack = [] } = state;
			state.tabs = tabs.filter(x => x.url !== targetKey);
			state.active_stack = active_stack.filter(x => x !== targetKey);
		}
	},
	effects: {
		*remove_tab(action, { put, select }) {
			const reidrecturl = yield select(
				state => state.tabs.active_stack.filter(x => x !== action.payload)[0] || '/'
			);
			yield put(routerRedux.push(reidrecturl));
			yield put({
				type: 'remove',
				payload: action.payload
			});
		}
	}
};
