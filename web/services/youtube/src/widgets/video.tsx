import { Widget } from "@dashboard-web/service";
import React from "react";
import { VideoComponent } from "../components";

export class VideoWidget extends Widget {
    readonly id: string = "video";
    readonly name: string = "Video";
    readonly description: string = "Video widget";

    create(instance: string): JSX.Element {
        return <VideoComponent instance={instance} />;
    }
}
