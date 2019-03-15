import { fetchData } from '@/services/data'
export default {
    namespace : 'home',
    state: {
        results: []
    },
    effects : {
         *fetch({ payload }, { call, put }) {
            const data = yield call(fetchData, payload);
            yield put({ type: 'changeData', payload: data });
        },
    },
    reducers : {
        changeData(state, { payload }){
            state.results = payload.results
        }
    }
}