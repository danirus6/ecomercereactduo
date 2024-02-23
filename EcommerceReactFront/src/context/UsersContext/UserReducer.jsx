const users = (state, action) => {
    switch(action.type) {

        case 'LOGIN': 
        return {
            ...state,
            token: action.payload.token
        }

        case 'GET_USERS_INFO':
            return {
                ...state,
                token: action.payload
            }

        case 'LOGOUT':
            return {
                user: null,
                token: null
            }
        case 'REGISTER':
            return{
                ...state,
                users: [...state.users, action.payload]
            }
        
        default: 
            return state
    }
}

export default users