const express = require('express');
const router = express.Router();
const { getCollection } = require('../config/db');
const { verifyJWT } = require('../middlewares/auth');
const { ObjectId } = require('mongodb');

// POST /api/v1/users  — create/update user (legacy endpoint, prefer /auth/register)
router.post('/', async (req, res) => {
	try {
		const userData = req.body;
		if (!userData.email) {
			return res.status(400).send({ error: 'Email is required' });
		}

		const Users = getCollection('users');
		const existingUser = await Users.findOne({ email: userData.email });

		if (existingUser) {
			// update all except role and password
			const { role, password, ...rest } = userData;
			await Users.updateOne({ email: userData.email }, { $set: rest });
			return res.send({ message: 'User updated', role: existingUser.role });
		} else {
			// This endpoint should not be used for registration, but keeping for backward compatibility
			return res.status(400).send({ error: 'Please use /api/v1/auth/register for new users' });
		}
	} catch (err) {
		console.error('users.post error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

// GET /api/v1/users/role?email=... or ?userId=...
// Protected: require JWT token
router.get('/role', verifyJWT, async (req, res) => {
	try {
		const { email, userId } = req.query;
		if (!email && !userId)
			return res.status(400).send({ error: 'Email or userId required' });

		const Users = getCollection('users');
		let user = null;
		if (email) user = await Users.findOne({ email });
		if (!user && userId) user = await Users.findOne({ _id: new ObjectId(userId) });

		if (!user) return res.status(404).send({ error: 'User not found' });

		res.send({ role: user.role || 'user' });
	} catch (err) {
		console.error('users.role error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

// GET /api/v1/users/:userId  (profile) — protected; only yourself can fetch
router.get('/:userId', verifyJWT, async (req, res) => {
	try {
		const userId = req.params.userId;
		if (req.decoded.userId !== userId) {
			return res
				.status(403)
				.send({ error: 'Forbidden: You can only access your own profile' });
		}
		const Users = getCollection('users');
		const user = await Users.findOne({ _id: new ObjectId(userId) });
		if (!user) return res.status(404).send({ error: 'user not found' });
		
		// Remove password from response
		const userResponse = { ...user };
		delete userResponse.password;
		
		res.send(userResponse);
	} catch (err) {
		console.error('users.get error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

// PUT /api/v1/users/:userId — update by owner (protected)
router.put('/:userId', verifyJWT, async (req, res) => {
	try {
		const userId = req.params.userId;
		if (req.decoded.userId !== userId) {
			return res
				.status(403)
				.send({ error: 'Forbidden: You can only update your own profile' });
		}
		const updated = req.body;
		// Don't allow password updates through this route
		delete updated.password;
		
		const Users = getCollection('users');
		const result = await Users.updateOne(
			{ _id: new ObjectId(userId) },
			{ $set: updated, $currentDate: { lastUpdated: true } },
			{ upsert: false },
		);
		res.status(200).send({ message: 'Profile updated successfully', result });
	} catch (err) {
		console.error('users.put error', err);
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;
