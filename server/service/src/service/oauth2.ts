import {
    ServiceRequest,
    ServiceResponse,
    ServiceSetting,
    User,
} from "@dashboard/types";
import { ServiceAction } from "../action";
import {
    ServiceOAuth2Options,
    ServiceOAuth2Verify,
    ServiceOAuth2VerifyCallback,
} from "../types";
import { Service } from "./service";

export abstract class ServiceOAuth2 extends Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];
    abstract readonly oauth2Options: ServiceOAuth2Options;

    async oauth2State(request: ServiceRequest): Promise<ServiceResponse> {
        const token = await this.repository?.read(
            request.user.username,
            "accessToken"
        );

        return {
            code: 200,
            data: token !== undefined,
        };
    }

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
                await this.repository?.update(
                    accessTokenSetting.username,
                    accessTokenSetting.key,
                    accessTokenSetting,
                    true
                );
                await this.repository?.update(
                    refreshTokenSetting.username,
                    refreshTokenSetting.key,
                    refreshTokenSetting,
                    true
                );
            } catch (e) {
                return done(e);
            }

            done();
        };
    }
}
