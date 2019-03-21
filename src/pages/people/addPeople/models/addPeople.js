import { createPeople } from '@/services/peopleList'
import { notification } from 'antd';
export default {
    namespace: 'addPeople',
    effects: {
        *create({ payload }, { call }) {
			const result = yield call(createPeople, payload)
			if (result) {
				yield call(notification.success, {
                    message: '添加成功',
                    description: `成功添加员工 ${result.name}`
				});
			}
		},
        
    }
}