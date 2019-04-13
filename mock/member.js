import Mock from 'mockjs';
import _ from 'lodash'
import { listFilter } from '@/utils/methods'
let memberList = []
for (let i = 1; i < 3572; i++) {
    memberList.unshift(Mock.mock({
        'Id': i,
        'cardNumber': '@id',
        'name|1': '@cname',
        'tel': /^1[34578]\d{9}$/,
        'category|1': ['普通会员', '黄金会员', '铂金会员', '钻石会员'],
    }))
}

export default {
    "GET /api/v1/memberList/": (req, res) => {
        const params = req.query
        const dataList = _.chunk(memberList, params.page_size)
        if (params.search) {
            const searchList = listFilter(memberList, params.search)
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
                    'count': memberList.length
                }
            )
        }
    },
    "GET /api/v1/allMemberList/": (req, res) => {
        res.send(memberList)
    },
    "POST /api/v1/memberList/": (req, res) => {
        let data = req.body
        data.Id = memberList.length + 1
        data.sales = 0
        memberList.unshift(data)
        res.send(data)
    },
    "PATCH /api/v1/memberList/": (req, res) => {
        let data = req.body
        data.forEach(item =>{
            item.Id = memberList.length + 1
            item.sales = 0
            memberList.unshift(item)
        })
        res.send(data)
    },
    "PUT /api/v1/memberList/": (req, res) => {
        const Id = Number(req.query.Id)
        for (let i = 0; i < memberList.length; i++) {
            if (memberList[i].Id === Id) {
                Object.keys(memberList[i]).forEach(function (key) {
                    if(req.body[key]){
                        memberList[i][key] = req.body[key]
                    }else{
                        let data = _.clone(memberList[i][key])
                        memberList[i][key] = data
                    }
                })
                break;
            }
        }
        res.send(req.body)
    },
    "DELETE /api/v1/memberList/": (req, res) => {
        console.log(req.query)
        const Id = Number(req.query.Id)
        let data
        for (let i = 0; i < memberList.length; i++) {
            if (memberList[i].Id === Id) {
                data = memberList[i]
                memberList.splice(i,1)
                break;
            }
        }
        res.send(data)
    },
}