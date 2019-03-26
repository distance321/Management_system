import { fetchSalaryList, updateSalary, fetchAllSalary   } from '@/services/salaryList'
import { notification } from 'antd';
export default {
    namespace: 'salaryList',
    state: {
        count: '',
        results: [],
        allSalary: [],
        pagination: {
            page: 1,
            page_size: 10
        }
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const pagination = yield select(state => state.salaryList.pagination);
            const data = yield call(fetchSalaryList, { ...pagination, ...payload });
            yield put({ type: 'changeData', payload: data });
        },
        *fetchAllSalary(_, { call, put}) {
            const data = yield call(fetchAllSalary);
            yield put({ type: 'changeAllSalaryData', payload: data });
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
			const result = yield call(updateSalary, payload);
			if (result) {
				yield call(notification.success, {
                    message: '更新成功',
                    description: `成功更新 ${result.name} 的薪资 `
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
        changeAllSalaryData(state, { payload }) {
            state.allSalary = payload
        },
        changePaginationPage(state, { payload }) {
            state.pagination.page = payload
        }
    }
}