import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useUser(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/github/user`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { user: data ? data["data"] : undefined, error };
}
