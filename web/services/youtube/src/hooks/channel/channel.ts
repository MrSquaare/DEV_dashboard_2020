import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useChannel(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/youtube/channel`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { channel: data ? data["data"] : undefined, error };
}
