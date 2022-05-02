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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const authentication_guard_1 = require("../../dist/guards/authentication.guard");
const task_service_1 = require("./task.service");
function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate);
    const dates = [];
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
console.log(getDatesInRange(new Date("2022-04-27"), new Date("2022-04-29")));
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getHello() {
        return this.taskService.getHello();
    }
    create(name, description, startDate, endDate, status, empName, color) {
        return __awaiter(this, void 0, void 0, function* () {
            const workingDays = getDatesInRange(new Date(startDate), new Date(endDate));
            const task = yield this.taskService.create({
                name,
                empName,
                description: description,
                status: status,
                startDate: startDate,
                endDate: endDate,
                workingDays: workingDays,
                color: color,
            });
            return task;
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskService.getAllTasks();
            return tasks;
        });
    }
    getTask(taskId) {
        return this.taskService.getSingleTask(taskId);
    }
    updateTask(taskid, name, description, startDate, endDate, status, empName, color, workingDays) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskService.updateTask(taskid, name, description, startDate, endDate, status, empName, workingDays, color);
            return null;
        });
    }
    removeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskService.deleteTask(taskId);
            return null;
        });
    }
};
__decorate([
    (0, common_4.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], TaskController.prototype, "getHello", null);
__decorate([
    (0, common_4.Post)("create"),
    __param(0, (0, common_4.Body)("name")),
    __param(1, (0, common_4.Body)("description")),
    __param(2, (0, common_4.Body)("startDate")),
    __param(3, (0, common_4.Body)("endDate")),
    __param(4, (0, common_4.Body)("status")),
    __param(5, (0, common_4.Body)("empName")),
    __param(6, (0, common_4.Body)("color")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date,
        Date, String, String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_4.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasks", null);
__decorate([
    (0, common_4.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTask", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_4.Body)("name")),
    __param(2, (0, common_4.Body)("description")),
    __param(3, (0, common_4.Body)("startDate")),
    __param(4, (0, common_4.Body)("endDate")),
    __param(5, (0, common_4.Body)("status")),
    __param(6, (0, common_4.Body)("empName")),
    __param(7, (0, common_4.Body)("color")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Date,
        Date, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_3.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "removeTask", null);
TaskController = __decorate([
    (0, common_4.Controller)("task"),
    (0, common_2.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map