import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { ServiceAction } from "./action";

export abstract class ServiceActionSettings<T> extends ServiceAction {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly settings: Record<keyof T, string>;

    abstract run(request: ServiceActionRequest): Promise<ServiceActionResponse>;

    abstract mapRequestToSettings(request: ServiceActionRequest): Partial<T>;

    async settingsDelete(username: string, instance: string): Promise<void> {
        const key = `${this.id}/${instance}`;

        await this.repository?.delete(username, key);
    }

    async settingsGet(
        username: string,
        instance: string
    ): Promise<T | undefined> {
        const key = `${this.id}/${instance}`;
        const document = await this.repository?.read(username, key);

        return document?.value ? JSON.parse(document?.value) : undefined;
    }

    async settingsSet(
        username: string,
        instance: string,
        setting: Partial<T>
    ): Promise<T | undefined> {
        const previousSetting = await this.settingsGet(username, instance);

        setting = {
            ...(previousSetting || {}),
            ...setting,
        };

        const key = `${this.id}/${instance}`;
        const document = await this.repository?.update(
            username,
            key,
            {
                username: username,
                key: key,
                value: JSON.stringify(setting),
            },
            true
        );

        return document?.value ? JSON.parse(document?.value) : undefined;
    }

    toJSON(): Partial<ServiceAction> {
        const { repository, ...rest } = this;

        return rest;
    }
}
