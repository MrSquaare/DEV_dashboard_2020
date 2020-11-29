import { Widget } from "@dashboard-web/service";
import { Person, SvgIconComponent } from "@material-ui/icons";
import React from "react";
import { UserContent, UserSettings } from "../components/user";

export class UserWidget extends Widget {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User widget";
    readonly actionId: string = "user";
    readonly icon: SvgIconComponent = Person;

    createContent(instance: string): JSX.Element {
        return <UserContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <UserSettings instance={instance} save={save} />;
    }
}
