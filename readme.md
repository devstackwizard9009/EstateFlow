# EstateFlow 🏡

EstateFlow is a comprehensive **real estate platform** built with React and Node.js that connects property buyers, sellers, and real estate agents in one dynamic marketplace. The platform allows users to browse properties, make offers, manage listings, get expert guidance from agents, and connect with fellow property enthusiasts. With features like role-based authentication, advanced property management, payment integration, and interactive community features, EstateFlow makes real estate transactions seamless and efficient.

## 📦 Installation

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* MongoDB database
* Stripe account (optional, for payments)

### Client Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the client directory:
   ```env
   VITE_BASE_URL=http://localhost:5000
   VITE_STRIPE_PAYMENT_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```
   
   **Required:**
   - `VITE_BASE_URL` - Backend API URL (default: http://localhost:5000)
   
   **Optional:**
   - `VITE_STRIPE_PAYMENT_PUBLISHABLE_KEY` - Stripe publishable key for payments

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Server Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODBURL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
   
   **Required:**
   - `PORT` - Server port (default: 5000)
   - `MONGODBURL` - MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT token signing (use a strong random string)
   
   **Optional:**
   - `STRIPE_SECRET_KEY` - Stripe secret key for payment processing

   
   **Note:** Images are stored locally in the `server/uploads/` directory. No external image storage service is required.

4. **Start the server**:
   ```bash
   npm run dev
   ```

Your client app should be running at `http://localhost:5173` and your server at `http://localhost:5000`.

--

*EstateFlow - Making real estate transactions seamless and efficient for everyone.*
