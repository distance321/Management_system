
let dataList = [
    {
        "id": 1,
        "username": "admin",
        "email": "",
        "user_permissions": [1,2,3,4,5,6,7,8,9]
    },
]

let passwordList = [
    {
        "username": "admin",
        "password": 'admin123'
    }
]

let permissions = [
    {
        id : 1,
        dataName : '销售分析'
    },
    {
        id : 2,
        dataName : '薪资管理'
    },
    {
        id : 3,
        dataName : '商品列表'
    },
    {
        id : 4,
        dataName : '添加商品'
    },
    {
        id : 5,
        dataName : '会员列表'
    },
    {
        id : 6,
        dataName : '添加会员'
    },
    {
        id : 7,
        dataName : '员工列表'
    },
    {
        id : 8,
        dataName : '添加员工'
    },
    {
        id : 9,
        dataName : '用户管理'
    },
]

export default {
    "GET /api/v1/users/" : (req,res) => {
        res.send(
            {
                "count": dataList.length,
                "results": dataList
            }
        )
    },
    "DELETE /api/v1/users/": (req, res) => {
        const Id = Number(req.query.id)
        let data
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].id === Id) {
                data = dataList[i]
                
                dataList.splice(i,1)
                break;
            }
        }
        res.send(data)
    },
    'POST /api/v1/auth/token/' : (req,res) => {
        const params = req.body
        const User = dataList.find(x => x.username === params.username)
        if(User){
            const UserPwd = passwordList.find(x => x.username === params.username)
            if(UserPwd.password === params.password){
                res.send(
                    {
                        'token' : 'dajdoiqd12ehc9h9cdh23urh',
                        'user_permissions' : User.user_permissions
                    }
                )
            }else{
                res.send({'error' :'用户没有权限（令牌、用户名、密码错误）。'})
            }
        }else{
            res.send({'error' :'用户没有权限（令牌、用户名、密码错误）。'})
        }
    },
    "GET /api/v1/permissions/" : (req,res) => {
        res.send(
            {
                "count": permissions.length,
                "results": permissions
            }
        )
    },
    'POST /api/v1/users/': (req, res) => {
        const params = req.body
        const user = {
            id : dataList[0].id + 1,
            username : params.username,
            email : params.email,
            user_permissions : params.user_permissions
        }
        const userPwd = {
            username : params.username,
            password : params.password
        }
        dataList.unshift(user)
        passwordList.unshift(userPwd)
		res.send(user)
	},
    'PUT /api/v1/users/' : (req,res) => {
        const user = req.body
        const id = Number(req.query.id)
		for(let i=0;i<dataList.length;i++){
			if(dataList[i].id === id){
                dataList[i].username = user.username
                dataList[i].email = user.email
                dataList[i].user_permissions = user.user_permissions
				break
			}
		}
		res.send(user)
    },
    'POST /api/v1/users/reset_password/': (req, res) => {
        const username = req.body.username
        const pwd = req.body.password
        let flag = true
        for(let i=0; i<passwordList.length; i++){
            if(passwordList[i].username === username){
                passwordList[i].password = pwd
                flag = false
                res.send({
                    status: 'OK'
                })
                break;
            }
        }
        if(flag){
            res.send({
                status: 'not find'
            })
        }
        
    } 
}