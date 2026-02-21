🎉 Virtual Event Management API

A scalable RESTful API for managing virtual events, built with Node.js, Express, and MongoDB.

This application supports secure authentication, role-based authorization, event management, and attendee registration.

🚀 Project Status

✅ Core features implemented

User Registration & Login

JWT Authentication

Role-Based Access Control (Organizer / Attendee)

Event CRUD Operations

Event Registration System

Centralized Error Handling

🛠 Tech Stack

⚡ Node.js + Express

🍃 MongoDB + Mongoose

🔐 JWT (Authentication)

🔑 bcrypt (Password Hashing)

✅ Joi (Request Validation)

🧹 Custom Middleware (Auth, Validation, Error Handling)

📁 Project Structure
├── index.js                # Application entry point
├── app.js                  # Express configuration
├── config/
│   └── db.config.js        # MongoDB connection setup
│
├── routes/
│   ├── index.route.js
│   ├── auth.route.js
│   └── event.route.js
│
├── controllers/
│   ├── auth.controller.js
│   └── event.controller.js
│
├── services/
│   ├── auth.service.js
│   └── event.service.js
│
├── models/
│   ├── user.model.js
│   └── event.model.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── validate.middleware.js
│   └── error.middleware.js
│
├── validations/
│
├── utils/
│   ├── apiError.js
│   └── asyncHandler.js
🏁 Getting Started
✅ Prerequisites

Node.js (v16+ recommended)

npm

MongoDB (Local or Atlas)

📦 Installation

1️⃣ Clone the repository

2️⃣ Install dependencies

npm install
⚙️ Environment Configuration

Create a .env file in the root directory:

PORT=4040
MONGO_URI=mongodb://127.0.0.1:27017/virtual_management
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
🔎 Environment Variables
Variable	Description
PORT	Server port (default: 4040)
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret used to sign JWT tokens
JWT_EXPIRES_IN	Token expiration time
▶️ Run the Application

Development mode:

npm start

Server runs at:

http://localhost:4040

Base API path:

/api
📡 API Endpoints
🔐 Authentication
➕ Register

POST /api/auth/register

Request Body:

{
  "username": "sumit",
  "email": "sumit@example.com",
  "password": "123456",
  "role": "organizer"
}

Roles:

organizer

attendee

🔑 Login

POST /api/auth/login

{
  "email": "sumit@example.com",
  "password": "123456"
}

Response:

{
  "token": "JWT_TOKEN",
  "user": { ... }
}
👥 Get Users (Protected)

GET /api/auth/users

Header:

Authorization: Bearer <token>
📅 Event Management

🔒 All event routes require authentication.

➕ Create Event (Organizer Only)

POST /api/event

{
  "title": "Tech Meetup",
  "description": "Backend Session",
  "date": "2026-03-01",
  "attendees": []
}
📋 List All Events

GET /api/event

🔍 Get Event by ID

GET /api/event/:id

✏️ Update Event (Organizer Only)

PUT /api/event/:id

❌ Delete Event (Organizer Only)

DELETE /api/event/:id

🙋 Register for Event

POST /api/event/:id/register

Registers the logged-in user as an attendee.

🧠 Architecture Highlights

Clean separation of concerns (Controller → Service → Model)

MongoDB aggregation for joining organizer and attendee details

Centralized error handling using custom ApiError class

Async handler wrapper for clean async controller logic

Role-based route protection

🔐 Security Features

Password hashing using bcrypt

JWT-based authentication

Role-based authorization

Request validation with Joi

Centralized error handling

🚀 Future Improvements

Add pagination & filtering

Add Swagger/OpenAPI documentation

Add unit & integration tests

Add rate limiting

Add email notifications

Dockerize the application

Deploy to AWS

👨‍💻 Author

Sumit Raj

📜 License

ISC
