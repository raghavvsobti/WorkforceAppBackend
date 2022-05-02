import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class FallbackExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
