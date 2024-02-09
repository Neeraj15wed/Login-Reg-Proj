// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = 8000;

// Example data (replace with your database implementation)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neeraj_project'
});

// Route for user registration
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ status: 'fail', error: 'All fields are required' });
    }

    // Example check if user already exists (replace with your database logic)
    db.query(`SELECT * from users WHERE email = ${db.escape(email)}` , (err, result) => {
        if(err || result.length > 0) {
            return res.status(400).json({ error: 'User already exits | err executing' });
        } else {
            const newUser = { username, password, email };
            db.query(`INSERT INTO users name = ?, email = ?, password = ?`,
            [username, email, password],
            (err, result) => {
                if (err || result.length === 0) {
                    return res.status(400).json({ status: 'fail', error: 'Unable to register user' });
                } else {
                    res.status(200).json({ status: 'pass', message: 'User registered successfully' });
                }
            })           
        }
    })
});

// Route for user login
app.post('/api/login', (req, res) => {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password ) {
        return res.status(400).json({ status: 'fail', error: 'All fields are required' });
    }

    db.query(`
    SELECT * from users WHERE (email = ${db.escape(email)} || username = ${db.escape(username)}) AND password = ${db.escape(password)}`, 
    (err, result) => {
        if (err || result.length > 0) {
            return res.status(401).json({status: 'fail', error: 'Invalid username or password' });
        } else {
            res.status(200).json({ status: 'pass', message: 'Login successful', data: result });
    }});
});

// Route for fetching user profile
app.post('/api/user-profile', (req, res) => {
    const { username, password, email } = req.body;

    //Somehing must be present to change from username and password
    if (!email) {
        return res.status(400).json({ status: 'fail', error: 'Email is required' });
    }

    // Example check if user already exists (replace with your database logic)
    db.query(`SELECT * from users WHERE email = ${db.escape(email)} `, (err, result) => {
        if (err || result.length > 0) {
            return res.status(400).json({ status: 'fail', error: 'Unable to update profile' });
        } else {
            return res.status(200).json({ status: 'pass', message: 'User Profile fetched successfully', data: result });
        }
    })
});

// Route for updating user profile
app.post('/api/update-profile', (req, res) => {
    const { username, password, email } = req.body;

    //Somehing must be present to change from username and password
    if (!username && !password) {
        return res.status(400).json({ status: 'fail', error: 'At least one feild required' });
    }

    const queryStarting = "UPDATE users SET "
    let condition = []
    const whereCondition = ` WHERE email = ${db.escape(email)} `

    if(username && username.trim().length > 0) {
        const whereString = ` name = ${db.escape(username)} `
        condition = [...condition + whereString]
    }

    if(password && password.trim().length > 0) {
        const whereString = ` password = ${db.escape(password)} `
        condition = [...condition + whereString]
    }

    condition = condition.length > 1 ? condition.join(" AND ") : condition[0]
    const final_query = queryStarting + condition + whereCondition;

    // Example check if user already exists (replace with your database logic)
    db.query(final_query, (err, result) => {
        if (err || result.length > 0) {
            return res.status(400).json({status: 'fail', error: 'Unable to update profile' });
        } else {
            return res.status(200).json({ status: 'pass', message: 'User Profile set successfully' });       
        }
    })
});

//Start Server
app.listen(PORT, () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log(`Server is running on port ${PORT}`);
    });
    
});
