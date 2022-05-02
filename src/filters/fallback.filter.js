"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FallbackExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var FallbackExceptionFilter = /** @class */ (function () {
    function FallbackExceptionFilter() {
    }
    FallbackExceptionFilter.prototype["catch"] = function (exception, host) {
        console.log('fallback exception handler triggered', JSON.stringify(exception));
        var ctx = host.switchToHttp(), response = ctx.getResponse();
        response.status(500).json({
            statusCode: 500,
            createdBy: 'Fallback exception filter',
            errorMessage: exception.message
                ? exception.message
                : 'Unexpected error occured'
        });
    };
    FallbackExceptionFilter = __decorate([
        (0, common_1.Catch)()
    ], FallbackExceptionFilter);
    return FallbackExceptionFilter;
}());
exports.FallbackExceptionFilter = FallbackExceptionFilter;
