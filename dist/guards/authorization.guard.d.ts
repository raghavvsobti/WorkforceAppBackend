import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AuthorizationGuard implements CanActivate {
    private allowedRoles;
    constructor(allowedRoles: string[]);
    canActivate(context: ExecutionContext): boolean;
    isAllowed(userRoles: string[]): boolean;
}
