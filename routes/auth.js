// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.post('/register', function(req, res){

    turbo.createUser(req.body)
    .then(data => {
    	res.json({
    		confirmation: 'success',
    		data: data
    	})
    })
    .catch(err => {
    	res.json({
    		confirmation: 'fail',
    		message: err.message 
    	})
    })
})

router.post('/login', function(req, res){

    turbo.login(req.body)
    .then(data => {
        req.vertexSession.user = {id: data.id} //SESSION IS ADDED

    	res.json({
    		confirmation: 'success',
    		data: data
    	})
    })
    .catch(err => {
    	res.json({
    		confirmation: 'fail',
    		message: err.message 
    	})
    })
})

router.post('/update', function(req, res){
    if (req.vertexSession == null ){
        res.json({
            confirmation: 'fail',
            message: 'user not logged in'
        })
        return
    }

    if (req.vertexSession.user == null ){
        res.json({
            confirmation: 'fail',
            message: 'user not logged in'
        })
        return
    }

    turbo.updateUser(req.vertexSession.user.id, req.body)
    .then(data => {
        res.json({
            confirmation: 'success',
            user: data
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })

})

router.get('/currentuser', function(req, res){
	if (req.vertexSession == null ){
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}

	if (req.vertexSession.user == null ){
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}

    // res.json({
    // 	confirmation: 'success',
    // 	user: req.vertexSession.user
    // })

    turbo.fetchOne('user', req.vertexSession.user.id)
    .then(data => {
    	res.json({
    		confirmation: 'success',
    		user: data
    	})
    })
    .catch(err => {
    	res.json({
    		confirmation: 'fail',
    		message: err.message
    	})
    })

})	

module.exports = router