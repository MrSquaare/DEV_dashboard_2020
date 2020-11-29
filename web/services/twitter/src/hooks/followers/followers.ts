import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useFollowers(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/twitter/followers`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { followers: data ? data["data"] : undefined, error };
}
