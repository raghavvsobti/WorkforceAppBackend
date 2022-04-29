"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        },
    ],
});
//# sourceMappingURL=auth.model.js.map