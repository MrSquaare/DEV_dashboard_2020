import { UserSettingRepository } from "@dashboard/database";

export class UserSettings {
    repository: UserSettingRepository;

    constructor(repository: UserSettingRepository) {
        this.repository = repository;
    }

    async delete(username: string, key: string): Promise<void> {
        await this.repository.delete(username, key);
    }

    async get(username: string, key: string): Promise<string | undefined> {
        const document = await this.repository.read(username, key);

        return document?.value;
    }

    async set(
        username: string,
        key: string,
        value: string
    ): Promise<string | undefined> {
        const document = await this.repository.update(
            username,
            key,
            { value: value },
            true
        );

        return document?.value;
    }

    async list(username: string): Promise<Record<string, string> | undefined> {
        const documents = await this.repository.list(username);

        return documents?.reduce((map: Record<string, string>, document) => {
            map[document.key] = document.value;

            return map;
        }, {});
    }
}
