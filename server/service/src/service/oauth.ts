import { ServiceSetting, User } from "@dashboard/types";
import { ServiceAction } from "../action";
import {
    ServiceOAuthOptions,
    ServiceOAuthVerify,
    ServiceOAuthVerifyCallback,
} from "../types";
import { Service } from "./service";

export abstract class ServiceOAuth extends Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];
    abstract readonly oauthOptions: ServiceOAuthOptions;

    get oauthVerify(): ServiceOAuthVerify {
        return async (
            user: User,
            token: string,
            tokenSecret: string,
            done: ServiceOAuthVerifyCallback
        ) => {
            const accessTokenSetting: ServiceSetting = {
                username: user.username,
                key: "token",
                value: token,
                secure: true,
            };
            const refreshTokenSetting: ServiceSetting = {
                username: user.username,
                key: "tokenSecret",
                value: tokenSecret,
                secure: true,
            };

            try {
                await this.repository?.create(accessTokenSetting);
                await this.repository?.create(refreshTokenSetting);
            } catch (e) {
                return done(e);
            }

            done();
        };
    }
}
