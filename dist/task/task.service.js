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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate);
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date).toLocaleDateString());
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    getHello() {
        return Date();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = new this.taskModel(data);
            const result = yield newTask.save();
            return result.id;
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskModel.find().exec();
            return tasks.map((task) => ({
                id: task.id,
                name: task.name,
                description: task.description,
                status: task.status,
                startDate: task.startDate.toLocaleDateString(),
                endDate: task.endDate.toLocaleDateString(),
                empName: task.empName,
                workingDays: task.workingDays,
            }));
        });
    }
    getSingleTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.findTask(taskId);
            return {
                id: task.id,
                name: task.name,
                description: task.description,
                status: task.status,
                startDate: task.startDate,
                endDate: task.endDate,
                empName: task.empName,
                workingDays: task.workingDays,
            };
        });
    }
    updateTask(taskId, name, description, startDate, endDate, status, empName, workingDays) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(startDate, endDate, workingDays);
            const updatedTask = yield this.findTask(taskId);
            if (name) {
                updatedTask.name = name;
            }
            if (description) {
                updatedTask.description = description;
            }
            if (startDate) {
                updatedTask.startDate = startDate;
                updatedTask.workingDays = getDatesInRange(new Date(startDate), new Date(updatedTask.endDate));
            }
            if (endDate) {
                updatedTask.endDate = endDate;
                updatedTask.workingDays = getDatesInRange(new Date(updatedTask.startDate), new Date(endDate));
            }
            if (status) {
                updatedTask.status = status;
            }
            if (empName) {
                updatedTask.empName = empName;
            }
            console.log(updatedTask.workingDays);
            updatedTask.save();
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskModel.deleteOne({ _id: taskId }).exec();
            if (!result.deletedCount) {
                throw new common_1.NotFoundException("Could not find task.");
            }
        });
    }
    findTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield this.taskModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException("Could not find task.");
            }
            if (!task) {
                throw new common_1.NotFoundException("Could not find task.");
            }
            return task;
        });
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Task")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map