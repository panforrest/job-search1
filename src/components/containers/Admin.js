import React, { Component } from 'react'
import superagent from 'superagent'
import { connect } from 'react-redux'
import actions from '../../actions'

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
            this.props.currentUserReceived(currentuser)

        })

    }

	render(){
        const currentUser = this.props.user.currentUser
        if (currentUser == null)
        	console.log('NO CURRENT USER!')
        else 
        	console.log('CURRENT USER IS: ' + JSON.stringify(currentUser))

		return(
			<div>
			    This is the Admin Container! <br />
                
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