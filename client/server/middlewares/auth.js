const jwt = require('jsonwebtoken');
const { getCollection } = require('../config/db');

// JWT Token Verification Middleware
async function verifyJWT(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send({ error: 'Unauthorized access' });
	}

	const token = authHeader.split(' ')[1];
	if (!token || token === 'null') {
		return res.status(401).send({ error: 'Unauthorized access' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.decoded = decoded;
		next();
	} catch (err) {
		console.error('JWT verification error', err);
		return res.status(403).send({ error: 'Forbidden Access - Invalid token' });
	}
}

// Role Verification Middleware
function verifyRole(requiredRoles = []) {
	return async (req, res, next) => {
		try {
			const userId = req.decoded?.userId || req.decoded?.id;
			if (!userId) {
				return res.status(403).send({ error: 'Unauthorized' });
			}

			const Users = getCollection('users');
			const { ObjectId } = require('mongodb');
			const user = await Users.findOne({ _id: ObjectId.createFromHexString(userId) });

			if (!user || !requiredRoles.includes(user.role)) {
				return res.status(403).send({ error: 'Access denied' });
			}

			req.user = user;
			next();
		} catch (err) {
			console.error('verifyRole error', err);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
}

module.exports = {
	verifyJWT,
	verifyRole,
};
