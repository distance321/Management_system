import { createMember } from '@/services/memberList'
import { notification } from 'antd';
export default {
    namespace: 'addMember',
    effects: {
        *create({ payload }, { call }) {
			const result = yield call(createMember, payload)
			if (result) {
				yield call(notification.success, {
                    message: '添加成功',
                    description: `成功添加会员 ${result.name}`
				});
			}
		},
        
    }
}