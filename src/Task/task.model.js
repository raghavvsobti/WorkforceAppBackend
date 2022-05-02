"use strict";
exports.__esModule = true;
exports.TaskSchema = void 0;
var mongoose = require("mongoose");
exports.TaskSchema = new mongoose.Schema({
    color: { type: String, "default": "green-200" },
    name: { type: String, required: true },
    empName: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    workingDays: { type: Array }
}, {
    timestamps: true
});
