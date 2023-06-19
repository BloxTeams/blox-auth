import { Request, Response, NextFunction } from "express";
import { _OAuthData, _OAuthTokenData } from "./internal/oauth-redirect";

declare module "@bloxteams/blox-auth" {
    // Types

    export type AuthorizationOptions = {
        client_id: string;
        client_secret: string;
        grant_type: string;
        redirect_uri: string;
        response_type: string;
    }
    export type OAuthData = _OAuthData
    export type OAuthTokenData = _OAuthTokenData
    export type AuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => void
    export type UserInfo = {
        sub: string,
        name: string,
        nickname: string,
        preferred_username: string,
        created_at: number,
        profile: string
    }
    export type ResourceInfo = {
        owner: {
            id: string,
            type: string
        },
        resources: {
            universe: {
                ids: [
                    number
                ]
            }
        }
    }
    export type ResourcesInfo = {
        resource_infos: Array<ResourceInfo | null>
    }

    // Classes

    export class AuthorizationParams {
        scope: AuthorizationScopes;
        prompts: string;
        state?: string;
    }

    export class AuthorizationScopes {
        constructor (scopes: string[]);
        get scopes(): string;
    }

    export class Client {
        constructor (options: AuthorizationOptions);

        config(): AuthorizationOptions;
    }

    export class User {
        constructor(accessToken: string);
        get token(): string;
        getInfo(): Promise<UserInfo>;
        getResources(): Promise<ResourcesInfo>;
    }

    // Middlewares

    export function authorize(params: AuthorizationParams): (req: Request, res: Response, next: NextFunction) => void
    export function getToken(req: Request, res: Response, next: NextFunction): void;
}