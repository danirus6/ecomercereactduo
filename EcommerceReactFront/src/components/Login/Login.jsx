import React from 'react'
import { useContext, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UsersContext} from '../../context/UsersContext/UsersState'
import { Form, Input, Button } from 'antd'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(UsersContext)
    

    useEffect(() => {
        setTimeout(() => {
            const foundToken = JSON.parse(localStorage.getItem('token'))
            if(foundToken) {
                navigate('/profile')
            }
        }, 2000)
        
    }, [login])

    const onFinish = (values) => {
        login(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    
    return(
        <div className='container'>
            <h1>Login</h1>
                <Form
                    name='basic'
                    labelCol={{ span: 8}}
                    wrapperCol={{ span: 16}}
                    initialValues={{ remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Type your email, please' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType='button'>
                        <Link to='/register'>Register</Link>
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}

export default Login