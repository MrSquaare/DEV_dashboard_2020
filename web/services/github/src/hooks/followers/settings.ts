import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useFollowersSettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setFollowersSettings = (user: string) => {
        fetch(`/api/server/services/github/followers/settings`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            query: {
                instance: instance,
            },
            body: JSON.stringify({
                user: user,
            }),
        });
    };

    useEffect(() => {
        fetch(`/api/server/services/github/followers/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return {
        followersSettings: data ? data["data"] : undefined,
        error,
        setFollowersSettings: setFollowersSettings,
    };
}
