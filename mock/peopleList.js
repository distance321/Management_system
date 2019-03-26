import Mock from 'mockjs';
import _ from 'lodash'
let peopleList = []
for (let i = 1; i < 253; i++) {
    peopleList.unshift(Mock.mock({
        'Id': i,
        'workNumber': i,
        'name|1': '@cname',
        'birthDate': /^19[7-9][0-7]-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        'county|1': '@county(true)',
        'tel': /^1[34578]\d{9}$/,
        'category|1': ['正式', '实习'],
        'entryDate': /^201[5-9]-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    }))
}
export default peopleList