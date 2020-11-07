"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: "Please fill in a username",
        trim: true
    },
    password: {
        type: String,
        required: "Please fill in a password"
    }
}, 
{
    timestamps: true
});

// Add full-text search index
UserSchema.index({
    //"$**": "text"
    "password": "text",
    "name": "text"
});

module.exports = mongoose.model("User", UserSchema);