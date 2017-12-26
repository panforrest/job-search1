import React, { Component } from 'react'
import superagent from 'superagent'

class Admin extends Component {
    componentDidMount(){
    	
    	//who is logged in here???
        superagent.get('/auth/currentuser')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                console.log(err.message)
                return
            }

            const currentuser = response.body.user
            if (currentuser == null){
            	console.log('USER NOT LOGGED IN: ')
            	return
            }

            console.log('USER: '+JSON.stringify(currentuser))

        })

    }

	render(){
		return(
			<div>
			    This is the Admin Container!
			</div>
		)
	}
}

export default Admin