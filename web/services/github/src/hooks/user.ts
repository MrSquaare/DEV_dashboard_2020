import { GitHubUser } from "@dashboard/service-github";
import { useEffect, useState } from "react";

async function apiGetUser(instance: string): Promise<GitHubUser> {
    const response = await fetch(
        `http://localhost:4242/v1/services/github/user?instance=${instance}`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );
    const json = await response.json();

    return json["data"];
}

async function apiGetUserSettings(instance: string): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/github/user/settings?instance=${instance}`,
        {
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );
    const json = await response.json();

    return json["data"];
}

async function apiSetUserSettings(
    instance: string,
    user: string
): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/github/user/settings?instance=${instance}`,
        {
            method: "POST",
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
            }),
        }
    );
    const json = await response.json();

    return json["data"];
}

export function useUser(instance: string) {
    const [user, setUserState] = useState<GitHubUser>();
    const [userSettings, setUserSettingsState] = useState<any>();

    const getUser = () => {
        apiGetUser(instance)
            .then((user) => setUserState(user))
            .catch((e) => console.error(e));
    };

    const getUserSettings = () => {
        apiGetUserSettings(instance)
            .then((userSettings) => setUserSettingsState(userSettings))
            .catch((e) => console.error(e));
    };

    const setUserSettings = (user: string) => {
        apiSetUserSettings(instance, user)
            .then((userSettings) => {
                setUserSettingsState(userSettings);

                getUser();
            })
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        getUser();
        getUserSettings();
    }, []);

    return { user, userSettings, getUser, getUserSettings, setUserSettings };
}
