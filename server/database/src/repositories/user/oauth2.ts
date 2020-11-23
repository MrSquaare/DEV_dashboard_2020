import { IUserOAuth2Repository, User, UserOAuth2 } from "@dashboard/types";
import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { UserOAuth2Schema } from "../../schemas";
import { hash } from "../../security";

export class UserOAuth2Repository implements IUserOAuth2Repository {
    model: Model<UserOAuth2 & Document> = mongoose.model(
        "oauth2_user",
        UserOAuth2Schema
    );

    async create(user: UserOAuth2): Promise<void> {
        if (user?.accessToken) {
            user.accessToken = hash(user.accessToken);
        }
        if (user?.refreshToken) {
            user.refreshToken = hash(user.refreshToken);
        }

        await this.model.create(user);
    }

    async delete(username: string, provider: string): Promise<void> {
        await this.model.deleteOne({
            username: username,
            provider: provider,
        });
    }

    async read(username: string, provider: string): Promise<User | undefined> {
        const userDocument = await this.model.findOne({
            username: username,
            provider: provider,
        });

        return userDocument || undefined;
    }

    async update(
        username: string,
        provider: string,
        user: Partial<UserOAuth2>
    ): Promise<User | undefined> {
        if (user?.accessToken) {
            user.accessToken = hash(user.accessToken);
        }
        if (user?.refreshToken) {
            user.refreshToken = hash(user.refreshToken);
        }

        const userDocument = await this.model.findOneAndUpdate(
            {
                username: username,
                provider: provider,
            },
            user,
            { new: true }
        );

        return userDocument || undefined;
    }
}
