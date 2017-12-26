import React, { Component } from 'react'
import superagent from 'superagent'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {
    constructor(){
    	super()
    	this.state = {

    	}
    }

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
            this.props.currentUserReceived(currentuser)

        })

    }

    updateUsername(event){
    	console.log('updateUsername: '+event.target.value)
    	this.setState({
    		username: event.target.value
    	})
    }

    updateUser(event){
    	event.preventDefault()
    	console.log('Update User!')
    	if (this.state.username == null){
    		alert('No Changes Made!')
    		return
    	}

    	superagent.post('/auth/update')
    	.send({username: this.state.username})
    	.set('Accept', 'application/json')
    	.end((err, response) => {
    		if (err) {
    			alert('Error: ' + err.message)
    			return
    		}

    		console.log('User Updated: ' + JSON.stringify(response.body))
    		alert('User Updated!')
    	})
    }

	render(){
		//WILL SEE BOTH 'NO CURRENT USER!' AND 'CURRENT USER IS: ' + JSON.stringify(currentUser)
        const currentUser = this.props.user.currentUser
        if (currentUser == null)
        	console.log('NO CURRENT USER!')
        else 
        	console.log('CURRENT USER IS: ' + JSON.stringify(currentUser))

		return(
			<div className="container">
			    <h1>User Admin</h1>
			    <hr />

			    { (currentUser == null) ? null : (
                    <form>
				        <input type="text" onChange={this.updateUsername.bind(this)} defaultValue={currentUser.username} placeholder="Username" />
				        <br />
	                    <button onClick={this.updateUser.bind(this)}>Update User</button>
				    </form>

			    	)
			    }

					    
                
			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        user: state.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
    	currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)