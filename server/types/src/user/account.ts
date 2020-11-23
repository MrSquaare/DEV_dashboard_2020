import { User } from "./user";

export type UserAccount = User & {
    password: string;
    verification: string;
};
