import { IUserLocalRepository, User, UserLocal } from "@dashboard/types";
import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { UserLocalSchema } from "../../schemas";
import { hash } from "../../security";

export class UserLocalRepository implements IUserLocalRepository {
    model: Model<UserLocal & Document> = mongoose.model(
        "local_user",
        UserLocalSchema
    );

    async create(user: UserLocal): Promise<void> {
        if (user.password) {
            user.password = hash(user.password);
        }

        await this.model.create(user);
    }

    async delete(username: string): Promise<void> {
        await this.model.deleteOne({ username: username });
    }

    async read(username: string): Promise<User | undefined> {
        const userDocument = await this.model.findOne({ username: username });

        return userDocument || undefined;
    }

    async update(
        username: string,
        user: Partial<UserLocal>
    ): Promise<User | undefined> {
        if (user?.password) {
            user.password = hash(user.password);
        }

        const userDocument = await this.model.findOneAndUpdate(
            { username: username },
            user,
            { new: true }
        );

        return userDocument || undefined;
    }

    async comparePassword(
        username: string,
        password: string
    ): Promise<boolean> {
        const userDocument = await this.model
            .findOne({ username: username })
            .select("+password");

        return userDocument?.password === hash(password);
    }

    async compareVerification(
        username: string,
        verification: string
    ): Promise<boolean> {
        const userDocument = await this.model
            .findOne({ username: username })
            .select("+verification");

        return userDocument?.verification === verification;
    }
}
