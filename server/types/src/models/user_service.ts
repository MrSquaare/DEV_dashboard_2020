export interface UserServiceModel {
    username: string;
    serviceId: string;
    accessToken: string;
    refreshToken?: string;

    getAccessToken(): Promise<string>;
    getRefreshToken(): Promise<string>;
}
