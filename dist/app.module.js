"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_model_1 = require("./auth/auth.model");
const auth_module_1 = require("./auth/auth.module");
const notes_controller_1 = require("./notes/notes.controller");
const notes_model_1 = require("./notes/notes.model");
const notes_module_1 = require("./notes/notes.module");
const notes_service_1 = require("./notes/notes.service");
const task_model_1 = require("./Task/task.model");
const task_module_1 = require("./Task/task.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            task_module_1.TaskModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRoot("mongodb+srv://raghav:password1234@cluster0.zw0t1.mongodb.net/nestAPi?retryWrites=true&w=majority"),
            mongoose_1.MongooseModule.forFeature([{ name: "User", schema: auth_model_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "Task", schema: task_model_1.TaskSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "Note", schema: notes_model_1.NoteSchema }]),
            notes_module_1.NotesModule,
        ],
        controllers: [app_controller_1.AppController, notes_controller_1.NotesController],
        providers: [app_service_1.AppService, notes_service_1.NotesService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map