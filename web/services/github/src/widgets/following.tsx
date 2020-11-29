import { Widget } from "@dashboard-web/service";
import { SvgIconComponent, Person } from "@material-ui/icons";
import React from "react";
import { FollowingContent, FollowingSettings } from "../components";

export class FollowingWidget extends Widget {
    readonly id: string = "following";
    readonly name: string = "Following";
    readonly description: string = "Following widget";
    readonly actionId: string = "following";
    readonly icon: SvgIconComponent = Person;

    createContent(instance: string): JSX.Element {
        return <FollowingContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <FollowingSettings instance={instance} save={save} />;
    }
}
