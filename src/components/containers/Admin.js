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
        const email = (this.props.user.currentUser == null) ? null: this.props.user.currentUser.email 

		return(
			<div>
			    This is the Admin Container! <br />
                {email}
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