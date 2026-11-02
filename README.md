# Intro to Backend API

A Node.js and Express REST API backend connecting to MongoDB via Mongoose. Features user authentication (registration, login, logout with bcrypt password hashing) and full CRUD operations for posts.

## Architecture

```
backend/
├── src/
│   ├── app.js                 # Express app initialization & route mounting
│   ├── index.js               # Server entry point & database connection trigger
│   ├── config/
│   │   ├── constants.js       # Global constants (e.g., DB name)
│   │   └── database.js        # Mongoose connection logic
│   ├── controllers/
│   │   ├── post.controller.js # CRUD handlers for posts
│   │   └── user.controller.js # Auth handlers (register, login, logout)
│   ├── models/
│   │   ├── post.model.js      # Post Mongoose schema
│   │   └── user.model.js      # User Mongoose schema with bcrypt hashing
│   └── routes/
│       ├── post.route.js      # Post routes (/api/v1/posts)
│       └── user.route.js      # User routes (/api/v1/users)
├── .env.example               # Example environment configuration
└── package.json               # Dependencies & scripts
```

---

## Getting Started

### 1. Install Dependencies

Navigate to the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create `.env` (or use `atlas-credentials.env`) in the `backend/` directory:

```env
PORT=4000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net"
```

> **Note for MongoDB Atlas**: Ensure your current IP address (or `0.0.0.0/0`) is added to the **Network Access** IP whitelist in your MongoDB Atlas dashboard.

### 3. Run the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on `http://localhost:4000` (or your configured `PORT`).

---

## API Endpoints

### User Routes (`/api/v1/users`)

#### 1. Register User
- **Method**: `POST`
- **URL**: `/api/v1/users/register`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "message": "User registered successfully!",
    "user": {
      "id": "67...",
      "email": "john@example.com",
      "username": "johndoe"
    }
  }
  ```

#### 2. Login User
- **Method**: `POST`
- **URL**: `/api/v1/users/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "User logged in successfully",
    "user": {
      "id": "67...",
      "email": "john@example.com",
      "username": "johndoe"
    }
  }
  ```

#### 3. Logout User
- **Method**: `POST`
- **URL**: `/api/v1/users/logout`
- **Body**:
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

### Post Routes (`/api/v1/posts`)

#### 1. Create Post
- **Method**: `POST`
- **URL**: `/api/v1/posts/create`
- **Body**:
  ```json
  {
    "name": "First Post",
    "description": "Learning Express and Node.js backend development",
    "age": 24
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "67...",
      "name": "First Post",
      "description": "Learning Express and Node.js backend development",
      "age": 24,
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

#### 2. Get All Posts
- **Method**: `GET`
- **URL**: `/api/v1/posts/getPosts`
- **Response** (`200 OK`):
  ```json
  [
    {
      "_id": "67...",
      "name": "First Post",
      "description": "Learning Express and Node.js backend development",
      "age": 24
    }
  ]
  ```

#### 3. Update Post
- **Method**: `PATCH`
- **URL**: `/api/v1/posts/update/:id`
- **Body**:
  ```json
  {
    "description": "Updated description here"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Post Updated Successfully",
    "post": {
      "_id": "67...",
      "name": "First Post",
      "description": "Updated description here",
      "age": 24
    }
  }
  ```

#### 4. Delete Post
- **Method**: `DELETE`
- **URL**: `/api/v1/posts/delete/:id`
- **Response** (`200 OK`):
  ```json
  {
    "message": "Post successfully deleted"
  }
  ```
