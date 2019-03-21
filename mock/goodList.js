import Mock from 'mockjs';
import _ from 'lodash'
import { listFilter } from '@/utils/methods'
let goodList = []
for (let i = 1; i < 1000; i++) {
    goodList.unshift(Mock.mock({
        'Id': i,
        'serialNumber|1': '@id',
        'name|1': '@ctitle(4)',
        'total|2000-5000': 2345,
        'sales|1000-2500': 123,
        'category|1': ['家用电器', '食用酒水', '个护健康', '服饰箱包', '母婴产品', '其他'],
        'price|10-5000': 123
    }))
}

export default {
    "GET /api/v1/goodList/": (req, res) => {
        const params = req.query
        const dataList = _.chunk(goodList, params.page_size)
        if (params.search) {
            const searchList = listFilter(goodList, params.search)
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
                    'count': goodList.length
                }
            )
        }
    },
    "POST /api/v1/goodList/": (req, res) => {
        let data = req.body
        data.Id = goodList.length + 1
        data.sales = 0
        goodList.unshift(data)
        res.send(data)
    },
    "PUT /api/v1/goodList/": (req, res) => {
        const Id = Number(req.query.Id)
        for (let i = 0; i < goodList.length; i++) {
            if (goodList[i].Id === Id) {
                Object.keys(goodList[i]).forEach(function (key) {
                    if(req.body[key]){
                        goodList[i][key] = req.body[key]
                    }else{
                        let data = _.clone(goodList[i][key])
                        goodList[i][key] = data
                    }
                })
                break;
            }
        }
        res.send(req.body)
    },
    "DELETE /api/v1/goodList/": (req, res) => {
        const Id = Number(req.query.Id)
        let data
        for (let i = 0; i < goodList.length; i++) {
            if (goodList[i].Id === Id) {
                data = goodList[i]
                goodList.splice(i,1)
                break;
            }
        }
        res.send(data)
    },
}