import { Service } from "./service";
import {
    ServiceOAuth2Options,
    ServiceOAuth2Verify,
    ServiceOAuth2VerifyCallback,
} from "../types";
import { ServiceAction } from "../action";
import { User } from "@dashboard/types";
import { ServiceSetting } from "@dashboard/types";

export abstract class ServiceOAuth2 extends Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];
    abstract readonly oauth2Options: ServiceOAuth2Options;

    get oauth2Verify(): ServiceOAuth2Verify {
        return async (
            user: User,
            accessToken: string,
            refreshToken: string,
            done: ServiceOAuth2VerifyCallback
        ) => {
            const accessTokenSetting: ServiceSetting = {
                username: user.username,
                key: "accessToken",
                value: accessToken,
                secure: true,
            };
            const refreshTokenSetting: ServiceSetting = {
                username: user.username,
                key: "refreshToken",
                value: refreshToken,
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
