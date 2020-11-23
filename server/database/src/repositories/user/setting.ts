import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { UserSettingSchema } from "../../schemas";
import { decrypt, encrypt } from "../../security";
import { IUserSettingRepository } from "@dashboard/types";
import { UserSetting } from "@dashboard/types";

export class UserSettingRepository implements IUserSettingRepository {
    model: Model<UserSetting & Document> = mongoose.model(
        "user_settings",
        UserSettingSchema
    );

    async create(setting: UserSetting): Promise<void> {
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
    ): Promise<UserSetting | undefined> {
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
        setting: Partial<UserSetting>
    ): Promise<UserSetting | undefined> {
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
            }
        );

        return userDocument || undefined;
    }
}
