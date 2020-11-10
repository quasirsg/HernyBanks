"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 30 
    }
});

module.exports = mongoose.model("Token", tokenSchema);