import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("HTTP Exception triggered", JSON.stringify(exception));

    const ctx = host.switchToHttp();

    const response = ctx.getResponse(),
      request = ctx.getRequest(),
      statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createdBy: "HTTP EXCEPTION",
      errorMessage: exception.message,
    });
  }
}
