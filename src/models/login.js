import { Login, resetPwd } from '@/services/api';
import { fetchUsers,fetchPermissions, } from '@/services/users'
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
		permissions : null,
		user_permissions : []
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
		changePermissions( state, { payload } ){
			state.user_permissions = payload.results
		},
		changeUserId(state,{ payload }){
			const username = sessionStorage.getItem('username')
			payload.results.forEach(item => {
				if(item.username === username){
					state.userId = item.id
					state.permissions = item.user_permissions
				}
			});
		}
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
		*getUserId({ payload },{ call, put }){
			const res = yield call(fetchUsers, payload )
			if (res){
				yield put({
					type : 'changeUserId',
					payload : res
				})
			}
		},
		*fetchPermissions({ payload }, { put, call }){
            const result = yield call(fetchPermissions,payload);
			yield put({
				type: 'changePermissions',
				payload: result
			});
		},
		*resetPwd({ payload }, { call, put, select}) {
			const id= yield select(state => state.login.userId)
			const res = yield call(resetPwd, {password: payload, id: id});
			if (res.status === 'password set') {
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
