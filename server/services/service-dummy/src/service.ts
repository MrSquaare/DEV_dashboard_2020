import { Action, Service } from "@dashboard/service";
import { PostsAction, UsersAction } from "./actions";

export class DummyService extends Service {
    readonly id: string = "dummy";
    readonly name: string = "Dummy";
    readonly description: string = "A really dummy service";
    readonly version: string = "1.0.0";
    readonly actions: Action[] = [new PostsAction(), new UsersAction()];

    async load(): Promise<void> {
        console.log("Welcome!");
    }

    async unload(): Promise<void> {
        console.log("Goodbye!");
    }
}
