import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO:
        // setValues(validation(values));

        axios.post('http://localhost:8000/api/register', userData)
            .then(response => {
                console.log('Response:', response.data);

            })
            .catch(error => {
                console.error('Error:', error.response.data);
                // Handle error, such as displaying an error message to the user
            });
    };
    return (
        <div className='d-flex align-items-center justify-content-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor='username'>Name</label>
                        <input type='text' name="username" value={userData.username} onChange={handleInputChange} placeholder='Enter your Name' className='form-control rounded-0'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name="email" value={userData.email} onChange={handleInputChange} placeholder='Enter your Email' className='form-control rounded-0'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name="password" value={userData.password} onChange={handleInputChange} placeholder='Enter your password' className='form-control rounded-0'></input>
                    </div>
                    <button onClick={handleSubmit} className='btn btn-success w-100'>SignUp</button>
                    <p></p>
                    <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup