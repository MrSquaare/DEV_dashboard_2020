import { UserSetting } from "../../user";

export interface IUserSettingRepository {
    create(setting: UserSetting): Promise<void>;

    delete(username: string, key: string): Promise<void>;

    read(username: string, key: string): Promise<UserSetting | undefined>;

    update(
        username: string,
        key: string,
        setting: Partial<UserSetting>,
        create?: boolean
    ): Promise<UserSetting | undefined>;

    list(username: string): Promise<UserSetting[] | undefined>;
}
