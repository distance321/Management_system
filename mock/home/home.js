import Mock from 'mockjs';
import moment from 'moment';
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 7; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay - (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 40,
    });
}
const salesData = [];
for (let i = 0; i < 7; i += 1) {
    salesData.push({
        x: moment(new Date(beginDay - (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 5000) + 17000,
    });
}

const salesPieData = [
    {
        x: '家用电器',
        y: 45442,
    },
    {
        x: '食用酒水',
        y: 33231,
    },
    {
        x: '个护健康',
        y: 31132,
    },
    {
        x: '服饰箱包',
        y: 23412,
    },
    {
        x: '母婴产品',
        y: 12316,
    },
    {
        x: '其他',
        y: 12381,
    },
];
let dataList = Mock.mock({
        'weeklySales|100000-300000' : 150000,
        'salesWeekCompared|0-50.2' : 13.5,
        'salesWeekComparedType|1' : ['up','down'],
        'salesDayCompared|0-50.2' : 12.3,
        'salesDayComparedType|1' : ['up','down'],
        'weeklyOrders|10000-20000' : 15000,
        'ordersWeekCompared|0-50.2' : 13.5,
        'ordersWeekComparedType|1' : ['up','down'],
        'ordersDayCompared|0-50.2' : 12.3,
        'ordersDayComparedType|1' : ['up','down'],
        'newMembers|500-5000' : 800,
        'completeDegree|0-99.2' : 80.5,
        'visitData': visitData,
        'salesData': salesData,
        'salesPieData': salesPieData
    })


export default {
    "GET /api/v1/data/" : (req,res) => {
        res.send(
            {
                "results": dataList
            }
        )
    },
}