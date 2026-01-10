# 🏡 EstateFlow – Real Estate Platform (Backend)

📁 **Server Repo**: [GitHub]()


## 🛠 Stack Used

- **Runtime**: Node.js (CommonJS)
- **Server**: Express.js
- **DB**: MongoDB
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Payments**: Stripe
- **File Upload**: Multer (local storage)
- **Environment**: dotenv

---

## 🔐 Environment Variables

Add a `.env` file in the `server` directory with:

```env
PORT=5000
MONGODBURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Required Variables:
- `PORT` - Server port (default: 5000)
- `MONGODBURL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing (use a strong random string)

### Optional Variables:
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing

### Notes:
- Images are stored locally in the `server/uploads/` directory
- JWT tokens expire after 7 days
- The `uploads/` directory is created automatically on first upload

---

## 🚀 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### File Upload
- `POST /api/v1/upload` - Upload image (returns URL)
- `POST /api/v1/delete-image` - Delete image

### Users
- `GET /api/v1/users/:userId` - Get user profile (protected)
- `PUT /api/v1/users/:userId` - Update user profile (protected)
- `GET /api/v1/users/role` - Get user role (protected)
