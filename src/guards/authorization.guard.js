"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorizationGuard = void 0;
var common_1 = require("@nestjs/common");
var AuthorizationGuard = /** @class */ (function () {
    function AuthorizationGuard(allowedRoles) {
        this.allowedRoles = allowedRoles;
    }
    AuthorizationGuard.prototype.canActivate = function (context) {
        var host = context.switchToHttp(), request = host.getRequest();
        var user = request["user"];
        var allowed = this.isAllowed(user.roles);
        console.log("user is allowed: ", allowed);
        if (!allowed) {
            console.log("User is authenticated but not authorized, denying access...");
            throw new common_1.ForbiddenException();
        }
        console.log("User is authorized, allowing access");
        return true;
    };
    AuthorizationGuard.prototype.isAllowed = function (userRoles) {
        var _this = this;
        console.log("Comparing roles", this.allowedRoles, userRoles);
        var allowed = false;
        userRoles.forEach(function (userRole) {
            console.log("Checking if role is allowed", userRole);
            if (!allowed && _this.allowedRoles.includes(userRole)) {
                allowed = true;
            }
        });
        return allowed;
    };
    AuthorizationGuard = __decorate([
        (0, common_1.Injectable)()
    ], AuthorizationGuard);
    return AuthorizationGuard;
}());
exports.AuthorizationGuard = AuthorizationGuard;
