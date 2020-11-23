import { User } from "./user";

export type UserOAuth2 = User & {
    provider: string;
    accessToken: string;
    refreshToken: string;
};
