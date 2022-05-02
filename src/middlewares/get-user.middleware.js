"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetUserMiddleware = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("../constants");
var jwt = require("jsonwebtoken");
var GetUserMiddleware = /** @class */ (function () {
    function GetUserMiddleware() {
    }
    GetUserMiddleware.prototype.use = function (req, res, next) {
        var authJwtToken = req.headers.authorization;
        if (!authJwtToken) {
            next();
            return;
        }
        try {
            var user = jwt.verify(authJwtToken, constants_1.JWT_SECRET);
            if (user) {
                console.log("Found user details in jwt ", user);
                req["user"] = user;
            }
        }
        catch (err) {
            console.log("Error handling authentication jwt ", err);
        }
        next();
    };
    GetUserMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], GetUserMiddleware);
    return GetUserMiddleware;
}());
exports.GetUserMiddleware = GetUserMiddleware;
