import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApi } from "../api/api";

export function useUser(redirectTo?: string, redirectIfFound = false) {
    const { data, error, fetch } = useApi();
    const router = useRouter();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        fetch(
            `/api/server/user`,
            {
                headers: {
                    Authorization: `JWT ${jwt}`,
                },
            },
            () => {
                if (redirectTo && redirectIfFound) {
                    return router.push(redirectTo).catch();
                }
            },
            () => {
                if (redirectTo && !redirectIfFound) {
                    return router.push(redirectTo).catch();
                }
            }
        );
    }, []);

    return { user: data ? data["data"] : undefined, error };
}
