declare module "@bloxteams/blox-auth" {
    export interface AuthorizationOptions {
        client_id: string;
        client_secret: string;
        grant_type: string;
        redirect_uri: string;
        response_type: string;
    }

    export interface AuthorizationParams {
        scope: AuthorizationScopes;
        prompts: string;
        state: string;
    }

    export type BloxAuthMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;


    // Classes

    export class AuthorizationScopes {
        constructor (scopes: string[]): void;
        get scopes(): string;
    }

    export class Client {
        constructor (options: AuthorizationOptions): void;

        config(): AuthorizationOptions;
    }

    export class User {
        constructor(token: string): void;
        get token(): string;
        getInfo(): Promise<Object | Error>;
        getResources(): Promise<Object | Error>;
    }


    // Functions

    export function authorize(params: AuthorizationParams): Application<Record<string, any>>
    export function getToken(code: string): void;
}