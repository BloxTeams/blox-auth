import { _OAuthData } from "./internal/oauth-redirect";

declare module "express" {
    export interface Request {
        bloxAuth?: _OAuthData
    }
}