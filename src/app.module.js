"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
// import { TaskSchema } from "dist/task/task.model";
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_model_1 = require("./auth/auth.model");
var auth_module_1 = require("./auth/auth.module");
var constants_1 = require("./constants");
var get_user_middleware_1 = require("./middlewares/get-user.middleware");
var notes_controller_1 = require("./notes/notes.controller");
var notes_model_1 = require("./notes/notes.model");
var notes_module_1 = require("./notes/notes.module");
var notes_service_1 = require("./notes/notes.service");
var task_controller_1 = require("./Task/task.controller");
var task_model_1 = require("./Task/task.model");
var task_module_1 = require("./Task/task.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(get_user_middleware_1.GetUserMiddleware)
            .forRoutes(notes_controller_1.NotesController, task_controller_1.TaskController);
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                task_module_1.TaskModule,
                auth_module_1.AuthModule,
                mongoose_1.MongooseModule.forRoot(constants_1.MONGO_CONNECTION),
                mongoose_1.MongooseModule.forFeature([{ name: "User", schema: auth_model_1.UserSchema }]),
                mongoose_1.MongooseModule.forFeature([{ name: "Task", schema: task_model_1.TaskSchema }]),
                mongoose_1.MongooseModule.forFeature([{ name: "Note", schema: notes_model_1.NoteSchema }]),
                notes_module_1.NotesModule,
            ],
            controllers: [app_controller_1.AppController, notes_controller_1.NotesController],
            providers: [app_service_1.AppService, notes_service_1.NotesService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
