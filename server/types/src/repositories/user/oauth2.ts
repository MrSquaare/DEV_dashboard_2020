import { User, UserOAuth2 } from "../../user";

export interface IUserOAuth2Repository {
    create(user: UserOAuth2): Promise<void>;

    delete(username: string, provider: string): Promise<void>;

    read(username: string, provider: string): Promise<User | undefined>;

    update(
        username: string,
        provider: string,
        user: Partial<UserOAuth2>
    ): Promise<User | undefined>;
}
