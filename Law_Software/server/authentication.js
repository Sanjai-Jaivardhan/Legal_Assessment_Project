const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Legal_Assessment',
    password: 'Sanjai@jaivardhan18',
    port: 5432,
});
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Legal_Assessment',
//     password: 'root123',
//     port: 5432,
// });

const secretKey = '8cf04fefd57e544e73bc8f6bf49b28dd25e5475c1d75b001436cc68c151c2429a28fe0c636048c39a78559fd4e0a0c8b4b7fdb93f308a8b4e34e92599ed3a8c0';

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send('User Registered');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error registering user');
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).send('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.rows[0].id }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access token is missing');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};


app.post('/logout', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const decoded = jwt.decode(token);
        if (decoded) {
            const expiration = new Date(decoded.exp * 1000); 
            await pool.query(
                'INSERT INTO blacklist(token, expiration) VALUES($1, $2)',
                [token, expiration]
            );
            res.status(200).json({ message: 'User logged out successfully' });
        } else {
            res.status(400).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Blacklist Token Check Middleware
const isTokenBlacklisted = async (token) => {
    const result = await pool.query('SELECT * FROM blacklist WHERE token = $1', [token]);
    return result.rows.length > 0;
};

// Updated Authentication Middleware with Blacklist Check
const authenticateJWTWithBlacklistCheck = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access token is missing');
    }

    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
        return res.status(403).send('Token is blacklisted');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

// Protected route example
app.get('/protected', authenticateJWTWithBlacklistCheck, (req, res) => {
    res.status(200).send('Protected Content');
});

// Start the Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
