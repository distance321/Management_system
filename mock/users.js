
let dataList = [
    {
        "id": 1,
        "username": "admin",
        "email": ""
    },
]

let passwordList = [
    {
        "username": "admin",
        "password": 'admin123'
    }
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
                        'token' : 'dajdoiqd12ehc9h9cdh23urh'
                    }
                )
            }else{
                res.send(401)
            }
        }else{
            res.send(401)
        }
    },
    "GET /api/v1/permissions/" : (req,res) => {
        res.send(
            {
                "count": dataList.length,
                "results": dataList
            }
        )
    },
    'POST /api/v1/users/': (req, res) => {
        const params = req.body
        const user = {
            id : dataList[0].id + 1,
            username : params.username,
            email : params.email
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