const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
    bookID: { type: Number, required: true, unique: true },
    title: { type: String, required: true, maxlength: 200 },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: ['Fiction', 'Science', 'History', 'Technology', 'Biography', 'Comics']
    },
    publishedYear: {
        type: Number,
        required: true,
        min: [1900, 'Books published before 1900 are not allowed']
    },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Member Schema
const memberSchema = new mongoose.Schema({
    memberID: { type: Number, required: true, unique: true },
    name: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    department: { type: String },
    joinedDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    role: {
        type: String,
        required: true,
        enum: ['student', 'faculty']
    },
    gender: { type: String }
});

// Create models
const Book = new mongoose.model('book', bookSchema, 'book');
const Member = new mongoose.model('member', memberSchema, 'member');

module.exports = { book: Book, member: Member };
