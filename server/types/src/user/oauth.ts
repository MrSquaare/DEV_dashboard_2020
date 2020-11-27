import { User } from "./user";

export type UserOAuth = User & {
    provider: string;
};
