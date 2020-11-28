import { Widget } from "@dashboard-web/service";
import React from "react";
import {PeopleAlt, SvgIconComponent} from "@material-ui/icons";
import {ChannelContent, ChannelSettings} from "../components/channel";

export class ChannelWidget extends Widget {
    readonly id: string = "channel";
    readonly name: string = "Channel";
    readonly description: string = "Channel widget";
    readonly actionId: string = "channel";
    readonly icon: SvgIconComponent = PeopleAlt;

    createContent(instance: string): JSX.Element {
        return <ChannelContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <ChannelSettings instance={instance} save={save} />;
    }
}
