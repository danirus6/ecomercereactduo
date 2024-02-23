import React from 'react'
import { useEffect, useContext } from 'react'
import { UsersContext } from '../../context/UsersContext/UsersState'
import { Spin } from 'antd'

const UserProfile = () => {
    const { getUserInfo, user } = useContext(UsersContext)
    useEffect(() => {
        getUserInfo()
    }, [])
    
    if(!user) {
    return (<Spin />)
    }

    return (
       <>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>UserName: {user.username}</p>
            <p>Password: {user.password}</p>
       </>
    )
}

export default UserProfile