import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { ServiceSettingSchema } from "../../schemas/service";
import { decrypt, encrypt } from "../../security/encryption";
import { IServiceSettingRepository } from "@dashboard/types";
import { ServiceSetting } from "@dashboard/types";

export class ServiceSettingRepository implements IServiceSettingRepository {
    model: Model<ServiceSetting & Document>;

    constructor(id: string) {
        this.model = mongoose.model(`${id}_setting`, ServiceSettingSchema);
    }

    async create(setting: ServiceSetting): Promise<void> {
        if (setting.secure) {
            setting.value = encrypt(setting.value);
        }

        await this.model.create(setting);
    }

    async delete(username: string, key: string): Promise<void> {
        await this.model.deleteOne({ username: username, key: key });
    }

    async read(
        username: string,
        key: string
    ): Promise<ServiceSetting | undefined> {
        const settingDocument = await this.model.findOne({
            username: username,
            key: key,
        });

        if (settingDocument?.secure) {
            settingDocument.value = decrypt(settingDocument.value);
        }

        return settingDocument || undefined;
    }

    async update(
        username: string,
        key: string,
        setting: Partial<ServiceSetting>,
        create = false
    ): Promise<ServiceSetting | undefined> {
        if (setting?.secure && setting?.value) {
            setting.value = encrypt(setting.value);
        }

        const userDocument = await this.model.findOneAndUpdate(
            {
                username: username,
                key: key,
            },
            setting,
            {
                new: true,
                upsert: create,
            }
        );

        return userDocument || undefined;
    }
}
