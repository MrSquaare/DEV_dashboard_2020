import { YouTubeChannel } from "@dashboard/service-youtube";
import { useEffect, useState } from "react";

async function apiGetChannel(instance: string): Promise<YouTubeChannel> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/channel?instance=${instance}`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );

    const json = await response.json();

    return json["data"];
}

async function apiGetChannelSettings(instance: string): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/channel/settings?instance=${instance}`,
        {
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );
    const json = await response.json();

    return json["data"];
}

async function apiSetChannelSettings(
    instance: string,
    channelURL: string
): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/channel/settings?instance=${instance}`,
        {
            method: "POST",
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channelURL: channelURL,
            }),
        }
    );
    const json = await response.json();

    return json["data"];
}

export function useChannel(instance: string) {
    const [channel, setChannelState] = useState<YouTubeChannel>();
    const [channelSettings, setChannelSettingsState] = useState<any>();

    const getChannel = () => {
        apiGetChannel(instance).then((channel) => setChannelState(channel));
    };

    const getChannelSettings = () => {
        apiGetChannelSettings(instance).then((channelSettings) =>
            setChannelSettingsState(channelSettings)
        );
    };

    const setChannelSettings = (channelURL: string) => {
        apiSetChannelSettings(instance, channelURL).then((channelSettings) => {
            setChannelSettingsState(channelSettings);

            getChannel();
        });
    };

    useEffect(() => {
        getChannel();
        getChannelSettings();
    }, []);

    return {
        channel,
        channelSettings,
        getChannel,
        getChannelSettings,
        setChannelSettings,
    };
}
