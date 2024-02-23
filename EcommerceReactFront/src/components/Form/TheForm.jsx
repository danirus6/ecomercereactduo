import React, { useContext } from 'react'; // useState ya no es necesario
import { useNavigate } from 'react-router-dom';
import './TheForm.styles.scss';
import Swal from 'sweetalert2';
import { UsersContext } from '../../context/UsersContext/UsersState';

const TheForm = () => {
    const { createUser } = useContext(UsersContext);
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validaciones
        if (event.target.name.value.length < 3 || 
            event.target.password.value.length < 8 || 
            event.target.email.value.length < 6) {
            Swal.fire({
                title: 'Error!',
                text: 'Rellena todos los campos correctamente!',
                confirmButtonText: 'Aceptar'
            });
            return; // Detener el envío si las validaciones fallan
        }

        // Extraer solo los datos necesarios del formulario
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        // Enviar los datos a createUser y manejar errores
        createUser(formData) 
            .then(() => {
                navigate('/login', { replace: true }); // Redirigir si exitoso
            })
            .catch(error => {
                console.error('Error creando usuario:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un problema al crear el usuario. Intenta nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            });
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='form__data'>
                <input className='form__data__box' placeholder='name' type='text' name='name' />
                <input className='form__data__box' placeholder='email' type='email' name='email' />
                <input className='form__data__box' placeholder='password' type='password' name='password' />
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default TheForm;
