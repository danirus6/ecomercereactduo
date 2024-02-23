import { createContext, useReducer } from "react"
import axios from 'axios'
import UserReducer from './UserReducer'
import users from "./UserReducer"

const token = JSON.parse(localStorage.getItem('token'))
const initialState = {
    users: [],
    token: token || null,
    user: null
}

const API_URL = 'http://localhost:3000/'

export const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer (UserReducer, initialState)

    const login = async (user) => {
        const res = await axios.post(API_URL + '/users/login', user) //Habría que mirar el users/login
        
        dispatch({
            type: 'LOGIN',
            payload: res.data
        })

        if(res.data) {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            console.log(res.data.token)
        }
    }

    const getUserInfo = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        const res = await axios.get(API_URL + '/users/info', { //Habría que mirar el users/info
            headers: { authorization: token }
        })

        dispatch({
            type: 'GET_USER_INFO',
            payload: res.data
        })
        return res
    }

    const logout = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        const res = await axios.delete(API_URL + '/users/logout', { 
            headers: { authorization: token }
        })
        dispatch({
            type: 'LOGOUT',
            payload: res.data
        })
        if(res.data) {
            localStorage.removeItem('token')
        }
        return res
    }
    const createUser = async (user) => {
    try{
        const res = await axios.post(API_URL + 'users/register', user)
        dispatch({
            type: 'REGISTER',
            payload: res.data.user
        });
        
    }catch(err) {
        console.log(err)
    }
}
    return(
        <UsersContext.Provider
            value={{
                token:state.token,
                user: state.user,
                users: [],
                login,
                getUserInfo,
                logout,
                createUser
            }}
        > { children }</UsersContext.Provider>
    )
}

export const UsersContext = createContext(initialState)