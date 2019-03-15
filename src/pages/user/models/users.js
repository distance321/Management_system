import { fetchPermissions,createUsers, updateUsers, fetchUsers,  deleteUsersById } from '@/services/users';
import { notification } from 'antd';
export default {
	namespace: 'users',
	state: {
		count: '',
		results: [],
		pagination : {
			page : 1,
			page_size : 10
		},
		permissions : []
	},
	reducers: {
		changeUsers(state, { payload }) {
			state.results = payload.results
            state.count = payload.count
		},
		changePaginationPage ( state, { payload } ){
			state.pagination.page = payload
		},
		changePermissions( state, { payload } ){
			state.permissions = payload.results
		}
	},
	effects: {
		*fetchUsers({ payload }, { put, call, select }) {
			const pagination = yield select(state => state.users.pagination); 
            const result = yield call(fetchUsers, {  ...pagination, ...payload});
			yield put({
				type: 'changeUsers',
				payload: result
			});
		},
		*fetchPermissions({ payload }, { put, call }){
            const result = yield call(fetchPermissions,payload);
			yield put({
				type: 'changePermissions',
				payload: result
			});
		},
		*removeById({ payload }, { put, call }) {
			const result = yield call(deleteUsersById, payload);
			if (result) {
				yield call(notification.success, {
					message: '删除成功'
				});
				yield put({
					type: 'fetchUsers'
				});
			}
		},
		*create({ payload }, { put, call }) {
			const userInfo = payload.userInfo
			const user_permissions = payload.user_permissions
			const result = yield call(createUsers, userInfo);
			if (result) {
				result.groups = [2]
				let permissions = []
				user_permissions.forEach(item => {
					if(item.name !== 'user_management'){
						permissions.push(item.id)
					}
				});
				result.user_permissions = permissions
				const res = yield call(updateUsers, { userInfo : result, id : result.id })
				if(res){
					yield call(notification.success, {
						message: '创建成功'
					});
					yield put({
						type: 'fetchUsers'
					});
				}
			}
		},
		*update({ payload }, { put, call }) {
			const result = yield call(updateUsers, payload);
			if (result) {
				yield call(notification.success, {
					message: '更新成功'
				});
				yield put({
					type: 'fetchUsers'
				});
			}
		},
		*changePage({ payload }, { put }){
			if(payload){
				yield put({
					type: 'changePaginationPage',
					payload: payload
				})
			}
		}
	}
};
