

export default {
    'POST /api/v1/auth/token/' : (req,res) => {
        const params = req.body
        if(params.username === 'admin' && params.password === 'admin123'){
            res.send(
                {
                    'token' : 'dajdoiqd12ehc9h9cdh23urh'
                }
            )
        }else{
            res.send(401)
        }
    },
}