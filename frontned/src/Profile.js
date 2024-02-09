import React, {useState} from 'react'
import axios from 'axios'

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO:
        // setValues(validation(values));

        axios.post('http://localhost:8000/api/update-profile', userData)
            .then(response => {
                console.log('Response:', response.data);
                localStorage.setItem('userData', response.data)
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                // Handle error, such as displaying an error message to the user
            });
    };

    //const userData = localStorage.getItem('userData')

    return (
        <div className='mb-3'>
            <h2>Profile</h2>
            <div className='mb-3'>
                <label htmlFor='username'>Your Name</label>
                <input type='text' name="username" value={userData.username} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='password'> Your Password</label>
                <input type='text' name="password" value={userData.password} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}> Edit</button>
        </div>
    )
}

export default Profile;