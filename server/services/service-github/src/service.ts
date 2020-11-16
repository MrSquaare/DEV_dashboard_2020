import { Action, Service } from "@dashboard/service";
import { Strategy } from "passport-github";

export class DummyService extends Service {
    readonly id: string = "github";
    readonly name: string = "GitHub";
    readonly description: string = "A GitHub service";
    readonly version: string = "1.0.0";
    readonly actions: Action[] = [];
    readonly strategy = new Strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || "unknown",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "unknown",
            callbackURL: `/v1/${this.id}/authentication/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
        }
    );

    async load(): Promise<void> {
        console.log("Octocat is awake!");
    }

    async unload(): Promise<void> {
        console.log("Octocat is sleeping...");
    }
}
