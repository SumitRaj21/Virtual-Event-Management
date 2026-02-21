🎉 Virtual Event Management API

A scalable RESTful API for managing virtual events, built using Node.js, Express, and MongoDB.

This system supports:

👤 User Registration & Login

🔐 JWT Authentication

🛡 Role-Based Authorization (Organizer / Attendee)

📅 Event Creation & Management

🙋 Event Registration System

⚠ Centralized Error Handling

🛠 Tech Stack

⚡ Node.js + Express

🍃 MongoDB + Mongoose

🔐 JSON Web Token (JWT)

🔑 bcrypt (Password Hashing)

✅ Joi (Validation)

🧹 Custom Middleware

📁 Project Structure
├── index.js
├── app.js
├── config/
│   └── db.config.js
├── routes/
│   ├── auth.route.js
│   ├── event.route.js
│   └── index.route.js
├── controllers/
├── services/
├── models/
├── middlewares/
├── validations/
└── utils/
🚀 Getting Started
✅ Prerequisites

Node.js (v16+ recommended)

npm

MongoDB (Local or Atlas)

📦 Installation
npm install
⚙️ Environment Configuration

Create a .env file in the root directory:

PORT=4040
MONGO_URI=mongodb://127.0.0.1:27017/virtual_management
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
▶️ Run the Application
npm start

Server runs at:

http://localhost:4040

Base API path:

/api
📡 API Endpoints

Base URL:

http://localhost:4040/api
🔐 Authentication Routes
➕ Register User

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

Response:

{
  "message": "User registered successfully"
}
🔑 Login User

POST /api/auth/login

Request Body:

{
  "email": "sumit@example.com",
  "password": "123456"
}

Response:

{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "user_id",
    "username": "sumit",
    "email": "sumit@example.com",
    "role": "organizer"
  }
}
👥 Get All Users (Protected)

GET /api/auth/users

Header:

Authorization: Bearer <token>
📅 Event Routes (Protected)

All event routes require JWT token in the header.

Header:

Authorization: Bearer <token>
➕ Create Event (Organizer Only)

POST /api/event

Request Body:

{
  "title": "Tech Meetup",
  "description": "Backend development session",
  "date": "2026-03-01",
  "attendees": []
}
📋 Get All Events

GET /api/event

Returns:

List of all events

Organizer details

Attendee details

🔍 Get Event By ID

GET /api/event/:id

Returns:

Event details

Organizer username

Attendee usernames

✏️ Update Event (Organizer Only)

PUT /api/event/:id

Request Body:

{
  "title": "Updated Title",
  "description": "Updated Description"
}
❌ Delete Event (Organizer Only)

DELETE /api/event/:id

Response:

{
  "message": "Event deleted successfully"
}
🙋 Register for Event (Attendee)

POST /api/event/:id/register

Response:

{
  "message": "Successfully registered for event"
}
🔐 Security Features

Passwords hashed using bcrypt

JWT-based authentication

Role-based access control

Request validation using Joi

Centralized error handling

🚀 Future Improvements

Pagination & filtering

Swagger/OpenAPI documentation

Unit & integration tests

Rate limiting

Docker support

AWS deployment

👨‍💻 Author

Sumit Raj
---------------------------------------
📄 Example .env File

Create a .env file in the root directory with the following content:

PORT=4040
MONGO_URI=mongodb://127.0.0.1:27017/virtual_management
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
