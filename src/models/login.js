import { Login, resetPwd } from '@/services/api';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
export default {
	namespace: 'login',
	state: {
		status: false,
		token: undefined,
		resetSuccess: false,
		userId : '',
	},
	reducers: {
		changeLoginStatus(state, { payload }) {
			return {
				...state,
				status: payload.status,
				token: payload.token
			};
		},
		changeResetSuccess(state) {
			state.resetSuccess = true;
		},
	},
	effects: {
		*login({ payload }, { call, put }) {
			const response = yield call(Login, payload);
			if (!response) {
				yield put({
					type: 'changeLoginStatus',
					payload: { ...response , ...{status : 'error' } }
				});
			} else {
				sessionStorage.setItem('username', payload.username)
				sessionStorage.setItem('token', response.token)
				sessionStorage.setItem('per', response.user_permissions)
				yield put({
					type: 'changeLoginStatus',
					payload: { ...response, ...{ status: true } }
				});
				yield put(routerRedux.replace('/'));
			}
		},
		*logout(_, { call, put }) {
			yield put({
				type: 'changeLoginStatus',
				payload: {
					status: false,
					token: undefined
				}
			});
			yield put(
				routerRedux.push({
					pathname: '/Login',
					search: stringify({
						redirect: window.location.href
					})
				})
			);
		},
		*resetPwd({ payload }, { call, put }) {
			const res = yield call(resetPwd, payload);
			if (res.status === 'OK') {
				yield put({
					type: 'changeResetSuccess'
				});
				yield call(notification.success, {
					message: '密码修改成功'
				});
			}
		}
	}
};
