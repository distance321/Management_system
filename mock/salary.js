import peopleList from './peopleList'
import Mock from 'mockjs';
import _ from 'lodash'
import { listFilter } from '@/utils/methods'
let salaryList = []
peopleList.forEach(item => {
    salaryList.push(Mock.mock({
        'Id': item.Id,
        'name' : item.name,
        'salary|3000-25000' : 1234,
        "absenteeism" : _.floor(0, 2),
        "subsidies" : _.floor(500, 2),
    }))
});

export default {
    "GET /api/v1/salaryList/": (req, res) => {
        const params = req.query
        const dataList = _.chunk(salaryList, params.page_size)
        if (params.search) {
            const searchList = listFilter(salaryList, params.search)
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
                    'count': salaryList.length
                }
            )
        }
    },
    "GET /api/v1/allSalaryList/": (req, res) => {
        res.send(salaryList)
    },
    "PUT /api/v1/salaryList/": (req, res) => {
        const Id = Number(req.query.Id)
        for (let i = 0; i < salaryList.length; i++) {
            if (salaryList[i].Id === Id) {
                Object.keys(salaryList[i]).forEach(function (key) {
                    if(req.body[key]){
                        salaryList[i][key] = req.body[key]
                    }else{
                        let data = _.clone(salaryList[i][key])
                        salaryList[i][key] = data
                    }
                })
                break;
            }
        }
        res.send(req.body)
    },
}