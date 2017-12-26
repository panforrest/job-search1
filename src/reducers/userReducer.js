var initialState = {
	currentUser: null 
}

export default (state = initialState, action) => {
    
    switch (action.type){
    	case 'CURRENT_USER_RECEIVED':
    	    
    	    console.log('CURRENT_USER_RECEIVED:')
    	    return state

    	default:
    	    return state

    }
}

