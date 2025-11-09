const express = require('express');
const db = require('./database');
const library = require('./library');
const Member = library.member;
const Book = library.book;
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Body parser middleware

// ============================================================================
// BOOK ENDPOINTS
// ============================================================================

/**
 * POST /lms/books
 * Purpose: Create a new book or multiple books
 * Method: POST
 * Body: Single book object or array of book objects
 * Expected Response: Created book(s) with status 201
 */
app.post('/lms/books', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const books = await Book.insertMany(req.body);
            res.status(201).json(books);
        } else {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /lms/books
 * Purpose: Get all books
 * Method: GET
 * Expected Response: Array of all books with status 200
 */
app.get('/lms/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /lms/books/available
 * Purpose: Get available books with optional filters (genre, publishedYear)
 * Method: GET
 * Query Parameters: genre (optional), publishedYear (optional)
 * Example: /lms/books/available?genre=Science&publishedYear=2022
 * Expected Response: Array of available books matching filters with status 200
 */
app.get('/lms/books/available', async (req, res) => {
    try {
        const { genre, publishedYear } = req.query;
        const filter = { isAvailable: true };

        if (genre) filter.genre = genre;
        if (publishedYear) filter.publishedYear = Number(publishedYear);

        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * GET /lms/books/issued
 * Purpose: Get all issued (unavailable) books
 * Method: GET
 * Expected Response: Array of issued books with status 200
 */
app.get('/lms/books/issued', async (req, res) => {
    try {
        const books = await Book.find({ isAvailable: false });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /lms/books/genre/:type
 * Purpose: Get books by genre type
 * Method: GET
 * URL Parameters: type (genre name)
 * Expected Response: Array of books matching the genre with status 200
 */
app.get('/lms/books/genre/:type', async (req, res) => {
    try {
        const genreType = req.params.type;
        const books = await Book.find({ genre: genreType });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============================================================================
// MEMBER ENDPOINTS
// ============================================================================

/**
 * POST /lms/members
 * Purpose: Create a new member or multiple members
 * Method: POST
 * Body: Single member object or array of member objects
 * Expected Response: Created member(s) with status 201
 */
app.post('/lms/members', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const members = await Member.insertMany(req.body);
            res.status(201).json(members);
        } else {
            const newMember = new Member(req.body);
            const savedMember = await newMember.save();
            res.status(201).json(savedMember);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /lms/members
 * Purpose: Get all members
 * Method: GET
 * Expected Response: Array of all members with status 200
 */
app.get('/lms/members', async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /lms/members/recent
 * Purpose: Get members who joined in the last 60 days
 * Method: GET
 * Expected Response: Array of recent members with status 200
 */
app.get('/lms/members/recent', async (req, res) => {
    try {
        // Calculate date 60 days ago
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        
        const members = await Member.find({
            joinedDate: { $gte: sixtyDaysAgo }
        });
        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /lms/members/role/:role
 * Purpose: Get members by role (student or faculty)
 * Method: GET
 * URL Parameters: role (student or faculty)
 * Expected Response: Array of members matching the role with status 200
 */
app.get('/lms/members/role/:role', async (req, res) => {
    try {
        const roleType = req.params.role;
        const members = await Member.find({ role: roleType });
        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

// Function to start server
function startServer() {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
}

// Start server based on MongoDB connection state
// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
if (db.readyState === 1) {
    // Already connected
    startServer();
} else {
    // Wait for connection
    db.once('open', () => {
        startServer();
    });
}

// Handle MongoDB connection errors
db.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
});
