"use strict";
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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const fallback_filter_1 = require("./filters/fallback.filter");
const http_filter_1 = require("./filters/http.filter");
const validation_filter_1 = require("./filters/validation.filter");
const common_1 = require("@nestjs/common");
const validation_exception_filter_1 = require("./filters/validation.exception.filter");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.useGlobalFilters(new fallback_filter_1.FallbackExceptionFilter(), new http_filter_1.HttpExceptionFilter(), new validation_filter_1.ValidationFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({
            skipMissingProperties: true,
            exceptionFactory: (errors) => {
                const messages = errors.map((error) => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(",")}`);
                return new validation_exception_filter_1.ValidationException(messages);
            },
        }));
        app.enableCors({
            origin: "[*]",
            credentials: true,
        });
        yield app.listen(process.env.PORT || 8000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map