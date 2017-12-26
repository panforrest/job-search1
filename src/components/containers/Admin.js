import React, { Component } from 'react'
import superagent from 'superagent'

class Admin extends Component {
    componentDidMount(){
    	// console.log('componentDidMount:')
    	//who is logged in here???
        superagent.get('/auth/currentuser')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                console.log(err.message)
                return
            }

            const data = response.body  //const data = response.body.data
            console.log('componentDidMount: '+JSON.stringify(data))

            // this.setState({
            // 	jobs: data
            // })
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