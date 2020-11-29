import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useFollowingSettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setFollowingSettings = (user: string) => {
        fetch(`/api/server/services/github/following/settings`, {
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
        fetch(`/api/server/services/github/following/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return {
        followingSettings: data ? data["data"] : undefined,
        error,
        setFollowingSettings: setFollowingSettings,
    };
}
