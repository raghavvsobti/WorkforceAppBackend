"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const mongoose = require("mongoose");
exports.TaskSchema = new mongoose.Schema({
    color: { type: String, default: "green-200" },
    name: { type: String, required: true },
    empName: { type: Array, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    workingDays: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
});
//# sourceMappingURL=task.model.js.map