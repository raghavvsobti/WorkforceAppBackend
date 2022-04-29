"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose = require("mongoose");
exports.NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
//# sourceMappingURL=notes.model.js.map