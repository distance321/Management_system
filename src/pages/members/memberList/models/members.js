import { fetchMemberList, deleteMember, updateMember, fetchAllMember  } from '@/services/memberList'
import { notification } from 'antd';
export default {
    namespace: 'memberList',
    state: {
        count: '',
        results: [],
        allMember: [],
        pagination: {
            page: 1,
            page_size: 10
        }
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const pagination = yield select(state => state.memberList.pagination);
            const data = yield call(fetchMemberList, { ...pagination, ...payload });
            yield put({ type: 'changeData', payload: data });
        },
        *fetchAllMember(_, { call, put}) {
            const data = yield call(fetchAllMember);
            yield put({ type: 'changeAllMemberData', payload: data });
        },
        *changePage({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'changePaginationPage',
                    payload: payload
                })
            }
        },
        *update({ payload }, { put,call }) {
			const result = yield call(updateMember, payload);
			if (result) {
				yield call(notification.success, {
                    message: '更新成功',
                    description: `成功更新会员 ${result.name}`
                });
                yield put({
					type: 'fetch'
				});
			}
		},
        *delete({ payload }, { put, call }) {
			const result = yield call(deleteMember, payload)
			if (result) {
				yield call(notification.success, {
                    message: '删除成功',
                    description: `成功删除会员 ${result.name}`
                });
                yield put({
					type: 'fetch'
				});
			}
		},
    },
    reducers: {
        changeData(state, { payload }) {
            state.results = payload.results
            state.count = payload.count
        },
        changeAllMemberData(state, { payload }) {
            state.allMember = payload
        },
        changePaginationPage(state, { payload }) {
            state.pagination.page = payload
        }
    }
}