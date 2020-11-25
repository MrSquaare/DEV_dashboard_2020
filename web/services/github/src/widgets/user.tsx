import { Widget } from "@dashboard-web/service";
import React from "react";
import { UserComponent } from "../components";

export class UserWidget extends Widget {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User widget";

    create(instance: string): JSX.Element {
        return <UserComponent instance={instance} />;
    }
}
