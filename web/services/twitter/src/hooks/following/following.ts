import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useFollowing(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/twitter/following`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { following: data ? data["data"] : undefined, error };
}
