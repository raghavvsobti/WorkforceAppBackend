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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
let NotesController = class NotesController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    getHello() {
        return this.noteService.getHello();
    }
    create(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.noteService.create({
                title,
                description: description,
            });
            return note;
        });
    }
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield this.noteService.getAllNotes();
            return notes;
        });
    }
    getNote(noteId) {
        return this.noteService.getSingleNote(noteId);
    }
    updateNote(noteid, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.noteService.updateNote(noteid, title, description);
            return null;
        });
    }
    removeNote(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.noteService.deleteNote(noteId);
            return null;
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], NotesController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)("title")),
    __param(1, (0, common_1.Body)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getAllNotes", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getNote", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("title")),
    __param(2, (0, common_1.Body)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "removeNote", null);
NotesController = __decorate([
    (0, common_1.Controller)("note"),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map