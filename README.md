# Task Manager API

A RESTful API for task management built with Node.js, Express, PostgreSQL, and MongoDB.

## Tech Stack
- Node.js / Express.js
- PostgreSQL (users) via Sequelize ORM
- MongoDB (tasks) via Mongoose ODM
- JWT Authentication
- Bcrypt password hashing
- Joi validation

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- MongoDB running locally

### Installation

1. Clone the repo:
   git clone <your-repo-url>
   cd task-manager-api

2. Install dependencies:
   npm install

3. Create a `.env` file (see `.env.example`):
   cp .env.example .env
   # Fill in your values

4. Create PostgreSQL database:
   createdb taskmanager

5. Start the server:
   npm run dev

## API Documentation

### Auth Endpoints

**POST /api/auth/register**
Body: { "email": "user@example.com", "password": "password123" }
Response: { "status": "success", "data": { "id": 1, "email": "..." } }

**POST /api/auth/login**
Body: { "email": "user@example.com", "password": "password123" }
Response: { "status": "success", "data": { "token": "jwt_token_here" } }

**GET /api/auth/profile** [Protected]
Header: Authorization: Bearer <token>
Response: { "status": "success", "data": { "id": 1, "email": "..." } }

### Task Endpoints (all require Authorization header)

**POST /api/tasks**
Body: { "title": "Task", "description": "...", "dueDate": "2025-12-31", "status": "pending" }

**GET /api/tasks** — Get all tasks for logged-in user

**GET /api/tasks/:id** — Get single task by ID

**PATCH /api/tasks/:id** — Update task (any field, partial updates allowed)
Body: { "status": "completed" }

**DELETE /api/tasks/:id** — Delete task

## Folder Structure
- src/config     → Database connection files
- src/controllers → Business logic
- src/middleware  → Auth, validation, error handling
- src/models      → Sequelize (User) and Mongoose (Task) models
- src/routes      → Express route definitions
- src/validators  → Joi schemas
