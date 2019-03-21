import { fetchPeopleList, deletePeople, updatePeople, fetchAllPeople  } from '@/services/peopleList'
import { notification } from 'antd';
export default {
    namespace: 'peopleList',
    state: {
        count: '',
        results: [],
        allPeople: [],
        pagination: {
            page: 1,
            page_size: 10
        }
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const pagination = yield select(state => state.peopleList.pagination);
            const data = yield call(fetchPeopleList, { ...pagination, ...payload });
            yield put({ type: 'changeData', payload: data });
        },
        *fetchAllPeople(_, { call, put}) {
            const data = yield call(fetchAllPeople);
            yield put({ type: 'changeAllPeopleData', payload: data });
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
			const result = yield call(updatePeople, payload);
			if (result) {
				yield call(notification.success, {
                    message: '更新成功',
                    description: `成功更新员工 ${result.name}`
                });
                yield put({
					type: 'fetch'
				});
			}
		},
        *delete({ payload }, { put, call }) {
			const result = yield call(deletePeople, payload)
			if (result) {
				yield call(notification.success, {
                    message: '删除成功',
                    description: `成功删除员工 ${result.name}`
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
        changeAllPeopleData(state, { payload }) {
            state.allPeople = payload
        },
        changePaginationPage(state, { payload }) {
            state.pagination.page = payload
        }
    }
}