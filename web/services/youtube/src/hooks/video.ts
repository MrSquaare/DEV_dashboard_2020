import { YouTubeVideo } from "@dashboard/service-youtube";
import { useEffect, useState } from "react";

async function apiGetVideo(instance: string): Promise<YouTubeVideo> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/video?instance=${instance}`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );

    const json = await response.json();

    return json["data"];
}

async function apiGetVideoSettings(instance: string): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/video/settings?instance=${instance}`,
        {
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );
    const json = await response.json();

    return json["data"];
}

async function apiSetVideoSettings(
    instance: string,
    videoURL: string
): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/youtube/video/settings?instance=${instance}`,
        {
            method: "POST",
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                videoURL: videoURL,
            }),
        }
    );
    const json = await response.json();

    return json["data"];
}

export function useVideo(instance: string) {
    const [video, setVideoState] = useState<YouTubeVideo>();
    const [videoSettings, setVideoSettingsState] = useState<any>();

    const getVideo = () => {
        apiGetVideo(instance)
            .then((video) => setVideoState(video))
            .catch((e) => console.error(e));
    };

    const getVideoSettings = () => {
        apiGetVideoSettings(instance)
            .then((videoSettings) => setVideoSettingsState(videoSettings))
            .catch((e) => console.error(e));
    };

    const setVideoSettings = (videoURL: string) => {
        apiSetVideoSettings(instance, videoURL)
            .then((videoSettings) => {
                setVideoSettingsState(videoSettings);

                getVideo();
            })
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        getVideo();
        getVideoSettings();
    }, []);

    return {
        video,
        videoSettings,
        getVideo,
        getVideoSettings,
        setVideoSettings,
    };
}
