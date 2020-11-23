import { IUserOAuthRepository, User, UserOAuth } from "@dashboard/types";
import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { UserOAuthSchema } from "../../schemas";
import { hash } from "../../security";

export class UserOAuthRepository implements IUserOAuthRepository {
    model: Model<UserOAuth & Document> = mongoose.model(
        "oauth_user",
        UserOAuthSchema
    );

    async create(user: UserOAuth): Promise<void> {
        if (user?.token) {
            user.token = hash(user.token);
        }
        if (user?.tokenSecret) {
            user.tokenSecret = hash(user.tokenSecret);
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
        user: Partial<UserOAuth>
    ): Promise<User | undefined> {
        if (user?.token) {
            user.token = hash(user.token);
        }
        if (user?.tokenSecret) {
            user.tokenSecret = hash(user.tokenSecret);
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
