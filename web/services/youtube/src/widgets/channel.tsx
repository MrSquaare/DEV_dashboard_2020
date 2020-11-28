import { Widget } from "@dashboard-web/service";
import React from "react";
import { ChannelComponent } from "../components";

export class ChannelWidget extends Widget {
    readonly id: string = "channel";
    readonly name: string = "Channel";
    readonly description: string = "Channel widget";
    readonly actionId: string = "channel";

    create(instance: string): JSX.Element {
        return <ChannelComponent instance={instance} />;
    }
}
