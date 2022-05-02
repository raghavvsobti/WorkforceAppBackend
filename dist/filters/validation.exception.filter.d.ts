import { BadRequestException } from '@nestjs/common';
export declare class ValidationException extends BadRequestException {
    validationErrors: string[];
    constructor(validationErrors: string[]);
}
