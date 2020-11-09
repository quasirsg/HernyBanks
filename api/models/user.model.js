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
        //required: "name is missing",
        trim: true
    },
    lastname: {
        type: String,
        lowercase: true,
        //required: "lastname is missing",
        trim: true
    },
    dni: {
        type: Number,
        //required: "DNI is missing",
        trim: true
    },
    phone: {
        type: String,
        //required: "DNI is missing",
        trim: true
    },
    address: {
        type: String,
        lowercase: true,
        //required: "residence address is missing",
        trim: true
    },
    dob: {
        type: Date,
        //required: "day of birth is missing",
        trim: true
    },
    auth: {
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