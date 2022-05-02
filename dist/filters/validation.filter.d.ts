import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from './validation.exception.filter';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any;
}
