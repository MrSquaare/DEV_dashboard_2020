import { OAuthOptions, OAuthVerify } from "../types/oauth";

export interface OAuth {
    options: OAuthOptions;

    verify(...args: unknown[]): OAuthVerify;
}
