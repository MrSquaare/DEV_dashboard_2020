import { User, UserOAuth } from "../../user";

export interface IUserOAuthRepository {
    create(user: UserOAuth): Promise<void>;

    delete(username: string, provider: string): Promise<void>;

    read(username: string, provider: string): Promise<User | undefined>;

    update(
        username: string,
        provider: string,
        user: Partial<UserOAuth>
    ): Promise<User | undefined>;
}
