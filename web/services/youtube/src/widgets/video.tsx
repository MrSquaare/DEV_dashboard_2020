import { Widget } from "@dashboard-web/service";
import React from "react";
import {Videocam, SvgIconComponent} from "@material-ui/icons";
import {VideoContent, VideoSettings} from "../components/video";

export class VideoWidget extends Widget {
    readonly id: string = "video";
    readonly name: string = "Video";
    readonly description: string = "Video widget";
    readonly actionId: string = "video";
    readonly icon: SvgIconComponent = Videocam;

    createContent(instance: string): JSX.Element {
        return <VideoContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <VideoSettings instance={instance} save={save} />;
    }
}
