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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthController = /** @class */ (function () {
    function AuthController(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    AuthController.prototype.getHello = function () {
        return this.authService.getHello();
    };
    AuthController.prototype.register = function (
    // authCredentialsDto: AuthCredentialsDto,
    name, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 12)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.authService.create({
                                name: name,
                                email: email,
                                password: hashedPassword
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthController.prototype.login = function (email, password, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, jwt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user) {
                            console.log("email error!");
                            throw new common_1.BadRequestException("Invalid Credentials");
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        if (!(_a.sent())) {
                            console.log(password, user.password);
                            throw new common_1.BadRequestException("Password Error, check credentials!!");
                        }
                        return [4 /*yield*/, this.jwtService.signAsync({ id: user.id })];
                    case 3:
                        jwt = _a.sent();
                        response.cookie("jwt", jwt, { httpOnly: true });
                        return [2 /*return*/, { message: "success", user: user, jwt: jwt }];
                }
            });
        });
    };
    AuthController.prototype.user = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var cookie, data, user, name_1, email, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        cookie = request.cookies["jwt"];
                        return [4 /*yield*/, this.jwtService.verifyAsync(cookie)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw new common_1.UnauthorizedException();
                        }
                        return [4 /*yield*/, this.authService.findOne({ id: data["id"] })];
                    case 2:
                        user = _a.sent();
                        name_1 = user.name, email = user.email;
                        // const userData = { name, email, notes };
                        return [2 /*return*/, user];
                    case 3:
                        error_1 = _a.sent();
                        throw new common_1.UnauthorizedException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.logout = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.clearCookie("jwt");
                return [2 /*return*/, { message: "Logout Success" }];
            });
        });
    };
    __decorate([
        (0, common_1.Get)()
    ], AuthController.prototype, "getHello");
    __decorate([
        (0, common_1.Post)("register"),
        __param(0, (0, common_1.Body)("name")),
        __param(1, (0, common_1.Body)("email")),
        __param(2, (0, common_1.Body)("password"))
    ], AuthController.prototype, "register");
    __decorate([
        (0, common_1.Post)("login"),
        __param(0, (0, common_1.Body)("email")),
        __param(1, (0, common_1.Body)("password")),
        __param(2, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "login");
    __decorate([
        (0, common_1.Get)("user"),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "user");
    __decorate([
        (0, common_1.Post)("logout"),
        __param(0, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "logout");
    AuthController = __decorate([
        (0, common_1.Controller)("auth")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
