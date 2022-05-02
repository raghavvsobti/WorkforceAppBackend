"use strict";
exports.__esModule = true;
exports.NoteSchema = void 0;
var mongoose = require("mongoose");
exports.NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
