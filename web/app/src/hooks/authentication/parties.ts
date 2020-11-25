import { useState } from "react";

async function apiAuthenticate(): Promise<void> {
    return new Promise((resolve) => {
        const win = window.open(
            `http://localhost:4242/v1/authentication/parties/twitter?redirect=http://localhost:3000/authentication/parties/twitter/callback`
        );

        win ? (win.onclose = () => resolve()) : resolve();
    });
}

export function useAuthentication() {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const authenticate = () => {
        apiAuthenticate()
            .then(() => setAuthenticated(true))
            .catch((e) => console.error(e));
    };

    return { authenticated, authenticate };
}
