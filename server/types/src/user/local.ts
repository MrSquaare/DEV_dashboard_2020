import { User } from "./user";

export type UserLocal = User & {
    password: string;
    verification: string;
};
