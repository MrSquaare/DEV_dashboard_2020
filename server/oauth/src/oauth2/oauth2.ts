import { OAuth2Options, OAuth2Verify } from "../types/oauth2";

export interface OAuth2 {
    options: OAuth2Options;

    verify(...args: unknown[]): OAuth2Verify;
}
