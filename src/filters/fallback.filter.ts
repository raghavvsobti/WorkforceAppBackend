import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      'fallback exception handler triggered',
      JSON.stringify(exception),
    );

    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    response.status(500).json({
      statusCode: 500,
      createdBy: 'Fallback exception filter',
      errorMessage: exception.message
        ? exception.message
        : 'Unexpected error occured',
    });
  }
}
