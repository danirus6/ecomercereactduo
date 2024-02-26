import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TheForm.styles.scss'
import Swal from 'sweetalert2'

const TheForm = () => {
    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    let navigate = useNavigate()
    let localData = JSON.parse(localStorage.getItem('data')) //Esto es para guardarlo en el navegador

    const handleInputChange = (event) => {
        setData({...data, [ event.target.name ]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(data.name && data.username && data.password) {
            if(localData == !null) {
                localData.push({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
            } else {
                localData = [{
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password
                }]
            }

        localStorage.setItem('data', JSON.stringify(localData))
        console.log({ message: 'data succesfully stored: '}, { name: data.name,
            username: data.username, email: data.email, password: data.password })
        setTimeout(()=> {navigate('/login')}, 2000) // El enlace a list habrá que cambiar.
        }
    }

    const Alert = () => {
        if(data.name.length < 3 || data.username.length < 4 || data.password.length < 8 || data.email.length <6) { //El límite de caracteres puede variar
            Swal.fire({  //Introducir cambios para que sea necesario usar caracteres especiales en el password
                title: 'Error!',
                text: 'Rellena todos los campos!',
                confirmButtonText: 'Aceptar'  
            })
        }
    }

    return (
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__data'>
                    <input className='form__data__box' placeholder='name' type='text' name='name' value={data.name} onChange={handleInputChange}/>
                    <input className='form__data__box' placeholder='username' type= 'text' name='username' value={data.username} onChange={handleInputChange}/>
                    <input className='form__data__box' placeholder='email' type= 'email' name='email' value={data.email} onChange={handleInputChange}/>
                    <input className='form__data__box' placeholder='password' type='text' name='password' value={data.password} onChange={handleInputChange}/>
                </div>
            <button type='submit' onClick={Alert}>Submit</button>
            </form>
    )
}

export default TheForm