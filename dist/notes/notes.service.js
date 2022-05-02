"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let NotesService = class NotesService {
    constructor(noteModel, userModel) {
        this.noteModel = noteModel;
        this.userModel = userModel;
    }
    getHello() {
        return Date();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(data.user);
            const newNote = new this.noteModel(data);
            user.notes.push(newNote);
            console.log("user", user);
            console.log(newNote);
            yield newNote.save();
            yield user.save();
            return newNote;
        });
    }
    getAllNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(userId);
            const populatedUser = yield user.populate("notes");
            return populatedUser.notes;
        });
    }
    getSingleNote(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.findNote(noteId);
            return {
                id: note.id,
                title: note.title,
                description: note.description,
            };
        });
    }
    updateNote(noteId, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedNote = yield this.findNote(noteId);
            if (title) {
                updatedNote.title = title;
            }
            if (description) {
                updatedNote.description = description;
            }
            updatedNote.save();
        });
    }
    deleteNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(userId);
            const usersNote = user.notes;
            const index = user.notes.indexOf(`${noteId}`);
            if (index > -1) {
                usersNote.splice(index, 1);
            }
            const result = yield this.noteModel.deleteOne({ _id: noteId }).exec();
            if (!result.deletedCount) {
                throw new common_1.NotFoundException("Could not find note.");
            }
            return user.save();
        });
    }
    findNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let note;
            try {
                note = yield this.noteModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException("Could not find note.");
            }
            if (!note) {
                throw new common_1.NotFoundException("Could not find note.");
            }
            return note;
        });
    }
};
NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Note")),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map