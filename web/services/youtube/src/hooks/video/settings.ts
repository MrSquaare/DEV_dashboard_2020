import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useVideoSettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setVideoSettings = (video: string) => {
        fetch(`/api/server/services/youtube/video/settings`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            query: {
                instance: instance,
            },
            body: JSON.stringify({
                videoURL: video,
            }),
        });
    };

    useEffect(() => {
        fetch(`/api/server/services/youtube/video/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { videoSettings: data ? data["data"] : undefined, error, setVideoSettings };
}
