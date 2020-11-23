import { TwitterUser } from "@dashboard/service-twitter";
import { useEffect, useState } from "react";

async function apiGetUser(instance: string): Promise<TwitterUser> {
    const response = await fetch(
        `http://localhost:4242/v1/services/twitter/user?instance=${instance}`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );

    console.log(response);

    const json = await response.json();

    return json["data"];
}

async function apiGetUserSettings(instance: string): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/twitter/user/settings?instance=${instance}`,
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
        `http://localhost:4242/v1/services/twitter/user/settings?instance=${instance}`,
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
    const [user, setUserState] = useState<TwitterUser>();
    const [userSettings, setUserSettingsState] = useState<any>();

    const getUser = () => {
        apiGetUser(instance).then((user) => setUserState(user));
    };

    const getUserSettings = () => {
        apiGetUserSettings(instance).then((userSettings) =>
            setUserSettingsState(userSettings)
        );
    };

    const setUserSettings = (user: string) => {
        apiSetUserSettings(instance, user).then((userSettings) => {
            setUserSettingsState(userSettings);

            getUser();
        });
    };

    useEffect(() => {
        getUser();
        getUserSettings();
    }, []);

    return { user, userSettings, getUser, getUserSettings, setUserSettings };
}
