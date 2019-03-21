
let dataList = [
    {
        "id": 1,
        "username": "admin",
        "email": "",
        "user_permissions": [1,2,3]
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
    "GET /api/v1/permissions/" : (req,res) => {
        res.send(
            {
                "count": dataList.length,
                "results": dataList
            }
        )
    },
    'POST /api/v1/users/': (req, res) => {
		const user = req.body
		user.id = dataList[0].id + 1
		dataList.unshift(user)
		res.send({
			status : 'OK'
		})
	},
    'PUT /api/v1/users/:id/' : (req,res) => {
        const user = req.body
		const id = user.id
		for(let i=0;i<dataList.length;i++){
			if(dataList[i].id === id){
				dataList.splice(i,1,user)
				break
			}
		}
		res.send({
			status : 'OK'
		})
    },
    'POST /api/v1/users/:id/reset_pwd': (req, res) => {
        res.send({
            status: 'OK'
        });
    } 
}