import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useUserSettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setUserSettings = (user: string) => {
        fetch(`/api/server/services/twitter/user/settings`, {
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
        fetch(`/api/server/services/twitter/user/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { userSettings: data ? data["data"] : undefined, error, setUserSettings };
}
