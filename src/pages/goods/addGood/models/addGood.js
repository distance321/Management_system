import { createGood } from '@/services/goodList'
import { notification } from 'antd';
export default {
    namespace: 'addGood',
    effects: {
        *create({ payload }, { call }) {
			const result = yield call(createGood, payload)
			if (result) {
				yield call(notification.success, {
                    message: '添加成功',
                    description: `成功添加商品 ${result.name}`
				});
			}
		},
        
    }
}