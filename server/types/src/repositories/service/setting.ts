import { ServiceSetting } from "../../service";

export interface IServiceSettingRepository {
    create(setting: ServiceSetting): Promise<void>;

    delete(username: string, key: string): Promise<void>;

    read(username: string, key: string): Promise<ServiceSetting | undefined>;

    update(
        username: string,
        key: string,
        setting: Partial<ServiceSetting>,
        create?: boolean
    ): Promise<ServiceSetting | undefined>;
}
