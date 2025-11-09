📘 Library Management System (LMS) API Documentation
Overview

This project is a fully developed RESTful API for managing books and members in a Library Management System (LMS). It includes functionality for adding, retrieving, and filtering books and members efficiently, and has been commented and enhanced by Auto Pilot.

Base URL: http://localhost:3000

GitHub Repository: https://github.com/Code-fever1/WAD-ASSIGNMENT-2

Developed entirely by Syed Alijah Muhammad, including database design, backend logic, and API structure.

📚 Book Endpoints
1. Create Book(s)

POST /lms/books
Create one or multiple books.

Example (Single Book)

{
  "bookID": 1,
  "title": "Introduction to Node.js",
  "author": "John Doe",
  "genre": "Technology",
  "publishedYear": 2022,
  "isAvailable": true
}


Example (Multiple Books)

[
  {
    "bookID": 1,
    "title": "Introduction to Node.js",
    "author": "John Doe",
    "genre": "Technology",
    "publishedYear": 2022
  },
  {
    "bookID": 2,
    "title": "Science Fundamentals",
    "author": "Jane Smith",
    "genre": "Science",
    "publishedYear": 2021
  }
]

2. Get All Books

GET /lms/books
Retrieve all available books in the library.

3. Get Available Books (with optional filters)

GET /lms/books/available

Optional query parameters:

genre → e.g., Science

publishedYear → e.g., 2022

Examples:

/lms/books/available

/lms/books/available?genre=Science

/lms/books/available?genre=Science&publishedYear=2022

4. Get Issued Books

GET /lms/books/issued
Retrieve all books currently issued (unavailable).

5. Get Books by Genre

GET /lms/books/genre/:type
Retrieve books by genre.

Example: /lms/books/genre/Science

👥 Member Endpoints
6. Create Member(s)

POST /lms/members
Create a single or multiple member entries.

7. Get All Members

GET /lms/members
Retrieve all members in the system.

8. Get Recent Members

GET /lms/members/recent
Retrieve members who joined in the last 60 days.

9. Get Members by Role

GET /lms/members/role/:role
Retrieve members filtered by role (e.g., student, faculty).

Example: /lms/members/role/student

⚙️ Common Error Responses

400 Bad Request

{ "error": "Validation error message" }


500 Internal Server Error

{ "success": false, "message": "Error message" }

🧩 Postman Testing

Setup:

Base URL: http://localhost:3000

Headers: Content-Type: application/json

MongoDB: localhost:27017

Tips:

Create books/members before testing filters.

Try different query combinations.

Verify proper HTTP status codes.

🗂️ Valid Values

Genres: Fiction, Science, History, Technology, Biography, Comics
Roles: student, faculty

🛠️ Environment Variables

Create a .env file:

MONGODB_URI=mongodb://localhost:27017/L1F23BSSE0073
PORT=3000

🧾 Summary of Endpoints
Method	Endpoint	Description
POST	/lms/books	Create new book(s)
POST	/lms/members	Create new member(s)
GET	/lms/books	Get all books
GET	/lms/members	Get all members
GET	/lms/books/available	Get available books (filterable)
GET	/lms/books/issued	Get issued books
GET	/lms/books/genre/:type	Get books by genre
GET	/lms/members/recent	Get members joined recently
GET	/lms/members/role/:role	Get members by role
🧑‍💻 Author

Developed by:
Syed Alijah Muhammad — Student Developer & System Designer

Project Repository: https://github.com/Code-fever1/WAD-ASSIGNMENT-2
