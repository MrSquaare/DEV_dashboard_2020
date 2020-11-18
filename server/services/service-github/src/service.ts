import { Service, ServiceAction } from "@dashboard/service";
import { UserModel, UserServiceSchemaModel } from "@dashboard/types";
import { Strategy } from "passport-github";
import { NotificationsAction } from "./actions";
import { internalServerStatus } from "./constants";
import { userTest } from "./tests/user";

export class DummyService extends Service {
    readonly id: string = "github";
    readonly name: string = "GitHub";
    readonly description: string = "A GitHub service";
    readonly version: string = "1.0.0";
    readonly actions: ServiceAction[] = [new NotificationsAction()];
    readonly strategy = new Strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || "unknown",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "unknown",
            callbackURL: `/v1/authentication/service/${this.id}/callback`,
            passReqToCallback: true,
            scope: ["notifications"],
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                await this.save(userTest, accessToken, refreshToken);

                done(null, profile);
            } catch (e) {
                done(internalServerStatus);
            }
        }
    );

    async load(): Promise<void> {
        console.log("Octocat is awake!");
    }

    async unload(): Promise<void> {
        console.log("Octocat is sleeping...");
    }

    private async save(
        user: UserModel,
        accessToken: string,
        refreshToken: string
    ) {
        await UserServiceSchemaModel.findOneAndDelete({
            username: user.username,
            serviceId: this.id,
        });

        const userServiceSchema = new UserServiceSchemaModel({
            username: user.username,
            serviceId: this.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });

        await userServiceSchema.save();
    }
}
