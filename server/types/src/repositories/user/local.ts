import { User, UserLocal } from "../../user";

export interface IUserLocalRepository {
    create(user: UserLocal): Promise<void>;

    delete(username: string): Promise<void>;

    read(username: string): Promise<User | undefined>;

    update(
        username: string,
        user: Partial<UserLocal>
    ): Promise<User | undefined>;

    comparePassword(username: string, password: string): Promise<boolean>;

    compareVerification(
        username: string,
        verification: string
    ): Promise<boolean>;
}
