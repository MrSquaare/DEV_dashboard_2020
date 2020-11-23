import { User, UserAccount } from "../../user";

export interface IUserRepository {
    create(user: UserAccount): Promise<void>;

    delete(username: string): Promise<void>;

    read(username: string): Promise<User | undefined>;

    update(
        username: string,
        user: Partial<UserAccount>
    ): Promise<User | undefined>;

    comparePassword(username: string, password: string): Promise<boolean>;

    compareVerification(
        username: string,
        verification: string
    ): Promise<boolean>;
}
