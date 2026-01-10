const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for local storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix + ext);
	},
});

const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
	fileFilter: (req, file, cb) => {
		const allowedTypes = /jpeg|jpg|png|gif|webp/;
		const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
		const mimetype = allowedTypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(new Error('Only image files are allowed'));
		}
	},
});

// Upload single image
router.post('/upload', upload.single('file'), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send({ error: 'No file uploaded' });
		}

		// Return URL that can be accessed from client
		const fileUrl = `/uploads/${req.file.filename}`;
		
		res.send({
			url: fileUrl,
			public_id: req.file.filename, // Use filename as public_id for deletion
			filename: req.file.filename,
		});
	} catch (error) {
		console.error('Upload error', error);
		res.status(500).send({ error: 'Image upload failed' });
	}
});

// Delete image
router.post('/delete-image', (req, res) => {
	try {
		const { public_id } = req.body;
		if (!public_id) {
			return res.status(400).send({ error: 'public_id is required' });
		}

		const filePath = path.join(uploadsDir, public_id);
		
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			res.send({ message: 'Image deleted successfully' });
		} else {
			res.status(404).send({ error: 'File not found' });
		}
	} catch (err) {
		console.error('Delete image error:', err);
		res.status(500).send({ error: 'Failed to delete image' });
	}
});

module.exports = router;

