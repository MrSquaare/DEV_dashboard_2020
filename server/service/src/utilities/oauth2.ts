import { IServiceSettingRepository } from "@dashboard/types";
import { userNotAuthenticated } from "../constants";

type OAuth2Tokens = {
    accessToken: string;
};

export async function getOAuth2Tokens(
    username: string,
    repository: IServiceSettingRepository | undefined
): Promise<OAuth2Tokens> {
    const accessToken = await repository?.read(username, "accessToken");

    if (!accessToken) {
        throw userNotAuthenticated;
    }

    return {
        accessToken: accessToken.value,
    };
}
