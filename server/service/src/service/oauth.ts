import {
    ServiceRequest,
    ServiceResponse,
    ServiceSetting,
    User,
} from "@dashboard/types";
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

    async oauthState(request: ServiceRequest): Promise<ServiceResponse> {
        const token = await this.repository?.read(
            request.user.username,
            "token"
        );

        return {
            code: 200,
            data: token !== undefined,
        };
    }

    get oauthVerify(): ServiceOAuthVerify {
        return async (
            user: User,
            token: string,
            tokenSecret: string,
            done: ServiceOAuthVerifyCallback
        ) => {
            const tokenSettings: ServiceSetting = {
                username: user.username,
                key: "token",
                value: token,
                secure: true,
            };
            const tokenSecretSettings: ServiceSetting = {
                username: user.username,
                key: "tokenSecret",
                value: tokenSecret,
                secure: true,
            };

            try {
                await this.repository?.update(
                    tokenSettings.username,
                    tokenSettings.key,
                    tokenSettings,
                    true
                );
                await this.repository?.update(
                    tokenSecretSettings.username,
                    tokenSecretSettings.key,
                    tokenSecretSettings,
                    true
                );
            } catch (e) {
                return done(e);
            }

            done();
        };
    }
}
