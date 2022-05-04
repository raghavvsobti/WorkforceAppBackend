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
    constructor(taskModel, userModel) {
        this.taskModel = taskModel;
        this.userModel = userModel;
    }
    getHello() {
        return Date();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(data.user);
            const newTask = new this.taskModel(data);
            const member = data.empName;
            yield member.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                const AssignedMember = yield this.userModel.findById(item._id);
                yield AssignedMember.tasks.push(newTask);
                console.log(AssignedMember.tasks);
                yield AssignedMember.save();
            }));
            user.tasks.push(newTask);
            yield newTask.save();
            yield user.save();
            return newTask;
        });
    }
    getAllTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(userId).exec();
            if (user.role === "superadmin") {
                const tasks = yield this.taskModel.find().exec();
                return tasks.map((task) => ({
                    id: task._id,
                    name: task.name,
                    description: task.description,
                    status: task.status,
                    startDate: task.startDate.toLocaleDateString(),
                    endDate: task.endDate.toLocaleDateString(),
                    empName: task.empName,
                    workingDays: task.workingDays,
                    color: task.color,
                }));
            }
            else {
                const populatedUser = yield user.populate("tasks");
                return populatedUser.tasks.map((task) => ({
                    id: task._id,
                    name: task.name,
                    description: task.description,
                    status: task.status,
                    startDate: task.startDate.toLocaleDateString(),
                    endDate: task.endDate.toLocaleDateString(),
                    empName: task.empName,
                    workingDays: task.workingDays,
                    color: task.color,
                }));
            }
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
                color: task.color,
                user: task.user,
            };
        });
    }
    updateTask(taskId, name, description, startDate, endDate, status, empName, workingDays, color) {
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
            if (color) {
                updatedTask.color = color;
            }
            console.log(updatedTask.workingDays);
            updatedTask.save();
        });
    }
    deleteTask(userId, taskId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(userId).exec();
            const usersTask = user.tasks;
            const index = user.tasks.indexOf(`${taskId}`);
            if (index > -1) {
                const populatedUser = yield user.populate("tasks");
                console.log((_a = populatedUser.tasks[index]) === null || _a === void 0 ? void 0 : _a["empName"], "populatedUser.tasks");
                yield ((_c = (_b = populatedUser === null || populatedUser === void 0 ? void 0 : populatedUser.tasks[index]) === null || _b === void 0 ? void 0 : _b["empName"]) === null || _c === void 0 ? void 0 : _c.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const assignedUserr = yield this.userModel.findById(item._id).exec();
                    const indexx = assignedUserr.tasks.indexOf(`${taskId}`);
                    const assignedUserTasks = assignedUserr.tasks;
                    if (indexx > -1) {
                        assignedUserTasks.splice(indexx, 1);
                    }
                    yield assignedUserr.save();
                })));
                usersTask.splice(index, 1);
            }
            const result = yield this.taskModel.deleteOne({ _id: taskId }).exec();
            if (!result.deletedCount) {
                throw new common_1.NotFoundException("Could not find task.");
            }
            return user.save();
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
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map