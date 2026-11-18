# Student Management API

A REST API for managing student records, built with Node.js, Express, PostgreSQL and Drizzle ORM.

## Setup

1. Install packages: npm install
2. Create a PostgreSQL database named student_management
3. Copy .env.example to .env and fill in your database details
4. Create the tables: npx drizzle-kit migrate
5. Start the server: npm start

The server runs on http://localhost:3000

## Endpoints

| Method | URL | Purpose |
|---|---|---|
| POST | /api/students | Register a student |
| GET | /api/students | Get all students (filter with ?department= and ?level=) |
| GET | /api/students/:id | Get one student by ID |
| GET | /api/students/search?name=John | Search students by name |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

## Error codes

- 400: invalid data or invalid ID
- 404: student not found
- 409: duplicate email or registration number
- 500: server error