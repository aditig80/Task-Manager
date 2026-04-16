# 🚀 Task Manager API

A secure and scalable RESTful API for managing tasks, built using **Node.js, Express, PostgreSQL, and MongoDB**.

---

## 🛠 Tech Stack

* **Node.js / Express.js**
* **PostgreSQL** (User data via Sequelize ORM)
* **MongoDB** (Task data via Mongoose ODM)
* **JWT Authentication**
* **Bcrypt** (Password hashing)
* **Joi** (Validation)

---

## ⚙️ Setup Instructions

### 📌 Prerequisites

* Node.js (v18+)
* PostgreSQL (running locally)
* MongoDB (running locally)

---

### 📥 Installation

```bash
git clone <your-repo-link>
cd task-manager-api
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file:

```env
PORT=3000

# PostgreSQL
DB_NAME=taskmanager
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

### 🗄 Database Setup

```bash
createdb taskmanager
```

---

### ▶️ Run Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 📡 API Documentation

---

### 🔐 Auth Endpoints

#### ➤ Register

```
POST /api/auth/register
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

#### ➤ Login

```
POST /api/auth/login
```

Response:

```json
{
  "status": "success",
  "data": {
    "token": "jwt_token"
  }
}
```

---

#### ➤ Get Profile (Protected)

```
GET /api/auth/profile
```

Header:

```
Authorization: Bearer <token>
```

---

### 📝 Task Endpoints (Protected)

#### ➤ Create Task

```
POST /api/tasks
```

```json
{
  "title": "Task",
  "description": "Test task",
  "dueDate": "2025-12-31",
  "status": "pending"
}
```

---

#### ➤ Get All Tasks

```
GET /api/tasks
```

---

#### ➤ Get Task by ID

```
GET /api/tasks/:id
```

---

#### ➤ Update Task

```
PATCH /api/tasks/:id
```

```json
{
  "status": "completed"
}
```

---

#### ➤ Delete Task

```
DELETE /api/tasks/:id
```

---

## 📁 Folder Structure

```
src/
│
├── config/        # Database connections
├── controllers/   # Business logic
├── middleware/    # Auth, validation, error handling
├── models/        # Sequelize & Mongoose models
├── routes/        # API routes
├── validators/    # Joi schemas
```

---

## 🧠 Design Decisions

* **Hybrid DB Architecture**

  * PostgreSQL → structured user data
  * MongoDB → flexible task data

* **JWT Authentication**

  * Stateless and scalable

* **Middleware-based architecture**

  * Clean separation of concerns

* **Validation Layer (Joi)**

  * Prevents invalid data early

---

## ⚠️ Error Handling

* Centralized error handler
* Proper HTTP status codes
* Validation error messages returned clearly

---

## 🔒 Security

* Passwords hashed using bcrypt
* JWT-based authentication
* Helmet for HTTP security
* CORS enabled

---

## 📌 Notes

* All task routes require authentication
* Users can only access their own tasks

---
