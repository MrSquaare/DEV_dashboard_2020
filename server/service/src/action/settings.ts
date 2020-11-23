import { ServiceAction } from "./action";
import { ServiceRequest, ServiceResponse } from "@dashboard/types";

export abstract class ServiceActionSettings<T> extends ServiceAction {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;

    abstract run(request: ServiceRequest): Promise<ServiceResponse>;

    abstract mapRequestToSettings(request: ServiceRequest): Partial<T>;

    async settingsDelete(username: string, instance: string) {
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
}
