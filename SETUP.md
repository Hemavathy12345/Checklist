# Setup Guide for Event Checklist Project

## MongoDB Atlas Configuration

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier is sufficient)

### 2. Get Connection String
1. In your MongoDB Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string

### 3. Environment Variables
Create a `.env.local` file in the root directory with:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/checklist?retryWrites=true&w=majority
```

Replace:
- `username` with your MongoDB Atlas username
- `password` with your MongoDB Atlas password
- `cluster` with your actual cluster name
- `checklist` with your desired database name

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Development Server
```bash
npm run dev
```

## Features Implemented

### Authentication System
- ✅ User registration with email, username, and password
- ✅ User login with email and password
- ✅ Password hashing with bcrypt
- ✅ Form validation and error handling
- ✅ MongoDB Atlas integration
- ✅ User data storage in localStorage after login

### Security Features
- ✅ Password hashing using bcryptjs
- ✅ Input validation and sanitization
- ✅ Duplicate user prevention
- ✅ Secure password requirements

### UI/UX Features
- ✅ Responsive design
- ✅ Loading states
- ✅ Error message display
- ✅ Form validation feedback
- ✅ Navigation between login and signup

## API Endpoints

### POST /api/auth/signup
- Creates a new user account
- Validates input data
- Checks for existing users
- Returns user data (without password)

### POST /api/auth/login
- Authenticates user credentials
- Validates email and password
- Returns user data on successful login

## Database Schema

### User Collection
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email format),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (auto-generated)
}
```

## Next Steps
1. Add JWT token authentication
2. Implement logout functionality
3. Add password reset functionality
4. Create protected routes
5. Add user profile management 