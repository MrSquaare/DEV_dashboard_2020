import { Widget } from "@dashboard-web/service";
import React from "react";
import { UsersComponent } from "../components";

export class UsersWidget extends Widget {
    readonly id: string = "users";
    readonly name: string = "Users";
    readonly description: string = "GET /users widget";

    create(): JSX.Element {
        return <UsersComponent />;
    }
}
