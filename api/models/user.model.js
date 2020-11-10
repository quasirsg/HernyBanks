"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: "username is missing",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: "email is missing",
        trim: true
    },
    password: {
        type: String,
        required: "password is missing"
    },
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        lowercase: true,
        trim: true
    },
    dni: {
        type: Number,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        lowercase: true,
        trim: true
    },
    dob: {
        type: Date,
        trim: true
    },
    auth: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

// Add full-text search index
UserSchema.index({
    //"$**": "text"
    "username": "text",
    "email": "text"
});

module.exports = mongoose.model("User", UserSchema);