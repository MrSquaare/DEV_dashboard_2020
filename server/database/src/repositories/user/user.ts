import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { UserSchema } from "../../schemas/user";
import { hash } from "../../security/hashing";
import { IUserRepository } from "@dashboard/types";
import { User, UserAccount } from "@dashboard/types";

export class UserRepository implements IUserRepository {
    model: Model<UserAccount & Document> = mongoose.model("user", UserSchema);

    async create(user: UserAccount): Promise<void> {
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
        user: Partial<UserAccount>
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
