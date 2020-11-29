import { Widget } from "@dashboard-web/service";
import { SvgIconComponent, Group } from "@material-ui/icons";
import React from "react";
import { FollowersContent, FollowersSettings } from "../components";

export class FollowersWidget extends Widget {
    readonly id: string = "followers";
    readonly name: string = "Followers";
    readonly description: string = "Followers widget";
    readonly actionId: string = "followers";
    readonly icon: SvgIconComponent = Group;

    createContent(instance: string): JSX.Element {
        return <FollowersContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <FollowersSettings instance={instance} save={save} />;
    }
}
