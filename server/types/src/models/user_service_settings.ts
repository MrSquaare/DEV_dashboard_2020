export interface UserServiceSettingsModel {
    username: string;
    serviceId: string;
    settings: Map<string, string>;
}
