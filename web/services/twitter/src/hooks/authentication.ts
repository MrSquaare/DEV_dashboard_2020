import { useEffect, useState } from "react";

async function apiAuthenticate(): Promise<void> {
    return new Promise((resolve) => {
        const win = window.open(
            `http://localhost:4242/v1/services/twitter/authentication?redirect=http://localhost:3000/services/twitter/authentication/callback`
        );

        win ? (win.onclose = () => resolve()) : resolve();
    });
}

async function apiGetAuthenticated(): Promise<boolean> {
    const response = await fetch(
        `http://localhost:4242/v1/services/twitter/authentication/state`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );

    const json = await response.json();

    return json["data"];
}

export function useAuthentication() {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const authenticate = () => {
        apiAuthenticate().then(() => getAuthenticated());
    };

    const getAuthenticated = () => {
        apiGetAuthenticated().then((authenticated) =>
            setAuthenticated(authenticated)
        );
    };

    useEffect(() => {
        getAuthenticated();
    }, []);

    return { authenticated, authenticate, getAuthenticated };
}
