import Mock from 'mockjs';
import _ from 'lodash'
import { listFilter } from '@/utils/methods'
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

export default {
    "GET /api/v1/peopleList/": (req, res) => {
        const params = req.query
        const dataList = _.chunk(peopleList, params.page_size)
        if (params.search) {
            const searchList = listFilter(peopleList, params.search)
            const results = _.chunk(searchList, params.page_size)
            res.send(
                {
                    "results": results[params.page - 1],
                    'count': searchList.length
                }
            )
        } else {
            res.send(
                {
                    "results": dataList[params.page - 1],
                    'count': peopleList.length
                }
            )
        }
    },
    "GET /api/v1/allPeopleList/": (req, res) => {
        res.send(peopleList)
    },
    "POST /api/v1/peopleList/": (req, res) => {
        let data = req.body
        data.Id = peopleList.length + 1
        data.sales = 0
        peopleList.unshift(data)
        res.send(data)
    },
    "PUT /api/v1/peopleList/": (req, res) => {
        const Id = Number(req.query.Id)
        for (let i = 0; i < peopleList.length; i++) {
            if (peopleList[i].Id === Id) {
                Object.keys(peopleList[i]).forEach(function (key) {
                    if(req.body[key]){
                        peopleList[i][key] = req.body[key]
                    }else{
                        let data = _.clone(peopleList[i][key])
                        peopleList[i][key] = data
                    }
                })
                break;
            }
        }
        res.send(req.body)
    },
    "DELETE /api/v1/peopleList/": (req, res) => {
        const Id = Number(req.query.Id)
        let data
        for (let i = 0; i < peopleList.length; i++) {
            if (peopleList[i].Id === Id) {
                data = peopleList[i]
                peopleList.splice(i,1)
                break;
            }
        }
        res.send(data)
    },
}