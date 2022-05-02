"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotesModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var notes_controller_1 = require("./notes.controller");
var notes_model_1 = require("./notes.model");
var notes_service_1 = require("./notes.service");
var NotesModule = /** @class */ (function () {
    function NotesModule() {
    }
    NotesModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: "Note", schema: notes_model_1.NoteSchema }])],
            controllers: [notes_controller_1.NotesController],
            providers: [notes_service_1.NotesService]
        })
    ], NotesModule);
    return NotesModule;
}());
exports.NotesModule = NotesModule;
