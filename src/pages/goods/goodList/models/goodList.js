import { fetchGoodList, deleteGood, updateGood  } from '@/services/goodList'
import { notification } from 'antd';
export default {
    namespace: 'goodList',
    state: {
        count: '',
        results: [],
        pagination: {
            page: 1,
            page_size: 10
        }
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const pagination = yield select(state => state.goodList.pagination);
            const data = yield call(fetchGoodList, { ...pagination, ...payload });
            yield put({ type: 'changeData', payload: data });
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
			const result = yield call(updateGood, payload);
			if (result) {
				yield call(notification.success, {
                    message: '更新成功',
                    description: `成功更新商品 ${result.name}`
                });
                yield put({
					type: 'fetch'
				});
			}
		},
        *delete({ payload }, { put, call }) {
			const result = yield call(deleteGood, payload)
			if (result) {
				yield call(notification.success, {
                    message: '删除成功',
                    description: `成功删除商品 ${result.name}`
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
        changePaginationPage(state, { payload }) {
            state.pagination.page = payload
        }
    }
}