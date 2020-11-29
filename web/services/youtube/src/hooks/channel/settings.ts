import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useChannelSettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setChannelSettings = (channelURL: string) => {
        fetch(`/api/server/services/youtube/channel/settings`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            query: {
                instance: instance,
            },
            body: JSON.stringify({
                channelURL: channelURL,
            }),
        });
    };

    useEffect(() => {
        fetch(`/api/server/services/youtube/channel/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return {
        channelSettings: data ? data["data"] : undefined,
        error,
        setChannelSettings,
    };
}
