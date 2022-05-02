"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TaskController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var common_3 = require("@nestjs/common");
var common_4 = require("@nestjs/common");
var authentication_guard_1 = require("../../dist/guards/authentication.guard");
// import { getDatesInRange } from "src/Task/utils.js";
function getDatesInRange(startDate, endDate) {
    var date = new Date(startDate);
    var dates = [];
    while (date <= endDate) {
        dates.push(new Date(date).toLocaleDateString());
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
function getFormat(today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    console.log(today);
}
// const d1 = new Date("2022-01-18");
// const d2 = new Date("2022-01-24");
console.log(getDatesInRange(new Date("2022-04-27"), new Date("2022-04-29")));
var TaskController = /** @class */ (function () {
    function TaskController(taskService) {
        this.taskService = taskService;
    }
    TaskController.prototype.getHello = function () {
        return this.taskService.getHello();
    };
    TaskController.prototype.create = function (name, description, startDate, endDate, status, empName, color) {
        return __awaiter(this, void 0, void 0, function () {
            var workingDays, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workingDays = getDatesInRange(new Date(startDate), new Date(endDate));
                        return [4 /*yield*/, this.taskService.create({
                                name: name,
                                empName: empName,
                                description: description,
                                status: status,
                                startDate: startDate,
                                endDate: endDate,
                                workingDays: workingDays,
                                color: color
                            })];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TaskController.prototype.getAllTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskService.getAllTasks()];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    TaskController.prototype.getTask = function (taskId) {
        return this.taskService.getSingleTask(taskId);
    };
    TaskController.prototype.updateTask = function (taskid, name, description, startDate, endDate, status, empName, color, workingDays) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskService.updateTask(taskid, name, description, startDate, endDate, status, empName, workingDays, color)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    TaskController.prototype.removeTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskService.deleteTask(taskId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    __decorate([
        (0, common_4.Get)()
    ], TaskController.prototype, "getHello");
    __decorate([
        (0, common_4.Post)("create"),
        __param(0, (0, common_4.Body)("name")),
        __param(1, (0, common_4.Body)("description")),
        __param(2, (0, common_4.Body)("startDate")),
        __param(3, (0, common_4.Body)("endDate")),
        __param(4, (0, common_4.Body)("status")),
        __param(5, (0, common_4.Body)("empName")),
        __param(6, (0, common_4.Body)("color"))
    ], TaskController.prototype, "create");
    __decorate([
        (0, common_4.Get)("all")
    ], TaskController.prototype, "getAllTasks");
    __decorate([
        (0, common_4.Get)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], TaskController.prototype, "getTask");
    __decorate([
        (0, common_1.Patch)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_4.Body)("name")),
        __param(2, (0, common_4.Body)("description")),
        __param(3, (0, common_4.Body)("startDate")),
        __param(4, (0, common_4.Body)("endDate")),
        __param(5, (0, common_4.Body)("status")),
        __param(6, (0, common_4.Body)("empName")),
        __param(7, (0, common_4.Body)("color"))
    ], TaskController.prototype, "updateTask");
    __decorate([
        (0, common_3.Delete)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], TaskController.prototype, "removeTask");
    TaskController = __decorate([
        (0, common_4.Controller)("task"),
        (0, common_2.UseGuards)(authentication_guard_1.AuthenticationGuard)
    ], TaskController);
    return TaskController;
}());
exports.TaskController = TaskController;
