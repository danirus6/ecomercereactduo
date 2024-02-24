import React from 'react'
import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext/UsersState'
import { Link, useNavigate } from 'react-router-dom'
import {
    LoginOutlined,
    LogoutOutlined,
    ProductOutlined,
    UserOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons'
import './TheHeader.styles.scss'

const TheHeader = () => {
    const navigate = useNavigate()
    const { token, logout } = useContext(UsersContext)

    const logoutUser = () => {
        logout()
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    return (
        <nav className='TheHeader'>
            <div>
                {token ? (
                    <>
                        <span className='menu-item' onClick={ logoutUser }>
                            <LogoutOutlined />
                            <Link to='/'>Logout</Link>
                        </span>
                        <span className='menu-item'>
                            <ProductOutlined />
                            <Link to= '/products'>Products</Link>
                        </span>
                        <span className='menu-item'>
                            <ShoppingCartOutlined />
                            <Link to='/cart'>Cart</Link>
                        </span>
                        <span className='menu-item'>
                            <UserOutlined />
                            <Link to='/profile'>Profile</Link>
                        </span>
                    </>
                ) : (
                    <span className='menu-item'>
                        <LoginOutlined />
                        <Link to='/login'>Login</Link>
                    </span>
                )}
            </div>
        </nav>
    )
}

export default TheHeader