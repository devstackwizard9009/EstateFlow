const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

// Register new user
router.post('/register', async (req, res) => {
	try {
		const { email, password, name, profilePic } = req.body;

		if (!email || !password || !name) {
			return res.status(400).send({ error: 'Email, password, and name are required' });
		}

		const Users = getCollection('users');
		
		// Check if user already exists
		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			return res.status(400).send({ error: 'User already exists' });
		}

		// Hash password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new user
		const newUser = {
			email,
			password: hashedPassword,
			name,
			profilePic: profilePic || null,
			role: 'user',
			created_at: new Date().toISOString(),
			last_log_in: new Date().toISOString(),
			age: null,
			gender: null,
			address: null,
			phoneNumber: null,
			status: 'active',
		};

		const result = await Users.insertOne(newUser);
		const userId = result.insertedId;

		// Generate JWT token
		const token = jwt.sign(
			{
				userId: userId.toString(),
				email: newUser.email,
				role: newUser.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		// Remove password from response
		delete newUser.password;

		res.status(201).send({
			message: 'User created successfully',
			token,
			user: {
				...newUser,
				_id: userId,
			},
		});
	} catch (err) {
		console.error('Register error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

// Login user
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).send({ error: 'Email and password are required' });
		}

		const Users = getCollection('users');
		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(401).send({ error: 'Invalid credentials' });
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).send({ error: 'Invalid credentials' });
		}

		// Update last login
		await Users.updateOne(
			{ _id: user._id },
			{ $set: { last_log_in: new Date().toISOString() } }
		);

		// Generate JWT token
		const token = jwt.sign(
			{
				userId: user._id.toString(),
				email: user.email,
				role: user.role || 'user',
			},
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		// Remove password from response
		const userResponse = { ...user };
		delete userResponse.password;

		res.send({
			message: 'Login successful',
			token,
			user: userResponse,
		});
	} catch (err) {
		console.error('Login error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

// Get current user (protected route)
const { verifyJWT } = require('../middlewares/auth');
router.get('/me', verifyJWT, async (req, res) => {
	try {
		const userId = req.decoded.userId;
		const Users = getCollection('users');
		const user = await Users.findOne({ _id: new ObjectId(userId) });

		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}

		// Remove password from response
		const userResponse = { ...user };
		delete userResponse.password;

		res.send(userResponse);
	} catch (err) {
		console.error('Get user error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;

