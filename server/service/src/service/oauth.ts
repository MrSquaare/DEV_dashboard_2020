import {
    OAuth,
    OAuthOptions,
    OAuthVerify,
    OAuthVerifyCallback,
} from "@dashboard/oauth";
import {
    ServiceRequest,
    ServiceResponse,
    ServiceSetting,
    User,
} from "@dashboard/types";
import { ServiceAction } from "../action";
import { Service } from "./service";

export abstract class ServiceOAuth extends Service implements OAuth {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];
    abstract readonly options: OAuthOptions;

    async state(request: ServiceRequest): Promise<ServiceResponse> {
        const token = await this.repository?.read(
            request.user.username,
            "token"
        );

        return {
            code: 200,
            data: token !== undefined,
        };
    }

    verify(user: User): OAuthVerify {
        return async (
            token: string,
            tokenSecret: string,
            done: OAuthVerifyCallback
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
