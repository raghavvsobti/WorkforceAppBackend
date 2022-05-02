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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    getHello() {
        return this.authService.getHello();
    }
    register(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(password, 12);
            const user = yield this.authService.create({
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            });
            return user;
        });
    }
    login(email, password, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.findOne({ email });
            console.log(user);
            if (!user) {
                console.log("email error!");
                throw new common_1.BadRequestException("Invalid Credentials");
            }
            if (!(yield bcrypt.compare(password, user.password))) {
                console.log(password, user.password);
                throw new common_1.BadRequestException("Password Error, check credentials!!");
            }
            const jwt = yield this.jwtService.signAsync({ id: user.id });
            response.cookie("jwt", jwt, { httpOnly: true });
            return { message: "success", user, jwt };
        });
    }
    user(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = request.cookies["jwt"];
                const data = yield this.jwtService.verifyAsync(cookie);
                if (!data) {
                    throw new common_1.UnauthorizedException();
                }
                const user = yield this.authService.findOne({ id: data["id"] });
                const { name, email } = user;
                return user;
            }
            catch (error) {
                throw new common_1.UnauthorizedException();
            }
        });
    }
    logout(response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.clearCookie("jwt");
            return { message: "Logout Success" };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)("name")),
    __param(1, (0, common_1.Body)("email")),
    __param(2, (0, common_1.Body)("password")),
    __param(3, (0, common_1.Body)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)("email")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map