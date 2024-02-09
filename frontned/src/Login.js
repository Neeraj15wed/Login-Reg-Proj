import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Loginvalidation';
function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors,setErrors] = useState({});
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO:
        // setValues(validation(values));

        axios.post('http://localhost:8000/api/login', values)
            .then(response => {
                console.log('Response:', response.data);
                localStorage.setItem('userData', response.data)
                
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                // Handle error, such as displaying an error message to the user
            });
    };

    return (
        <div className='d-flex align-items-center justify-content-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log-In</h2>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter your Email' value={values.email} name='email' onChange={handleInput} className='form-control rounded-0'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input onChange={handleInput} type='password' value={values.password} placeholder='Enter your password' name='password' className='form-control rounded-0'></input>
                    </div>
                    <button type='submit' onClick={(e) => handleSubmit(e)} className='btn btn-success w-100'>Login</button>
                    <p></p>
                    <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>SignUp</Link>
                </form>
            </div>
        </div>
    )
}

export default Login