import { StatusError, User } from "@dashboard/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApi } from "../api/api";

async function apiUser(
    username: string,
    id: string,
    setLoading: (loading: boolean) => void,
    setUser: (user: User | undefined) => void,
    setError: (error: StatusError | undefined) => void
) {
    setLoading(true);
    setUser(undefined);
    setError(undefined);
}

export function useUser(redirectTo?: string, redirectIfFound: boolean = false) {
    const { data, error, fetch } = useApi();
    const router = useRouter();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/server/user`, {
            headers: {
                "Authorization": `JWT ${jwt}`,
            },
        }, (data) => {
            if (redirectTo && redirectIfFound) {
                return router.push(redirectTo).catch();
            }
        }, (err) => {
            if (redirectTo && !redirectIfFound) {
                return router.push(redirectTo).catch();
            }
        });
    }, []);

    return { user: data ? data["data"] : undefined, error };
}
