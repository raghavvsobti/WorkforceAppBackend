import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { FallbackExceptionFilter } from "./filters/fallback.filter";
import { HttpExceptionFilter } from "./filters/http.filter";
import { ValidationFilter } from "./filters/validation.filter";
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ValidationException } from "./filters/validation.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(
              error.constraints
            ).join(",")}`
        );
        return new ValidationException(messages);
      },
    })
  );

  app.enableCors({
    origin: "[*]",
    credentials: true,
  });

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
