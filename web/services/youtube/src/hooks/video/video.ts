import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useVideo(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/youtube/video`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { video: data ? data["data"] : undefined, error };
}
