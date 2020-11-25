import { IServiceSettingRepository } from "@dashboard/types";
import { userNotAuthenticated } from "../constants";

type OAuthTokens = {
    token: string;
    tokenSecret: string;
};

export async function getOAuthTokens(
    username: string,
    repository: IServiceSettingRepository | undefined
): Promise<OAuthTokens> {
    const token = await repository?.read(username, "token");
    const tokenSecret = await repository?.read(username, "tokenSecret");

    if (!token || !tokenSecret) {
        throw userNotAuthenticated;
    }

    return {
        token: token.value,
        tokenSecret: tokenSecret.value,
    };
}
